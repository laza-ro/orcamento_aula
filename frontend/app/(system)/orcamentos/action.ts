"use server";

import { apiServerFetch } from "@/lib/api-server";
import { CriarOrcamentoPayload, AtualizarOrcamentoPayload, Orcamento } from "@/types/orcamentos";
import { revalidatePath } from "next/cache";

export async function getOrcamentos(): Promise<Orcamento[]> {
    const response = await apiServerFetch("/orcamentos");
    if (!response.ok) return [];
    return response.json();
}

export async function getOrcamento(id: number): Promise<Orcamento | null> {
    const response = await apiServerFetch(`/orcamentos/${id}`);
    if (!response.ok) return null;
    return response.json();
}

export async function criarOrcamento(payload: CriarOrcamentoPayload): Promise<Orcamento | { error: string }> {
    try {
        const response = await apiServerFetch("/orcamentos", {
            method: "POST",
            body: JSON.stringify(payload),
        });
        
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            return { error: err.message || "Erro ao criar orçamento" };
        }
        
        revalidatePath("/orcamentos");
        return response.json();
    } catch (error: any) {
        return { error: error.message || "Erro ao criar orçamento" };
    }
}

export async function atualizarOrcamento(id: number, payload: AtualizarOrcamentoPayload): Promise<Orcamento | { error: string }> {
    try {
        const response = await apiServerFetch(`/orcamentos/${id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
        });
        
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            return { error: err.message || "Erro ao atualizar orçamento" };
        }
        
        revalidatePath("/orcamentos");
        return response.json();
    } catch (error: any) {
        return { error: error.message || "Erro ao atualizar orçamento" };
    }
}