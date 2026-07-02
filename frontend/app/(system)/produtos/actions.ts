"use server";

import { apiServerFetch } from "@/lib/api-server";
import { Produto, NovoProduto } from "@/types/produtos";
import { revalidatePath } from "next/cache";

export async function getProdutos(): Promise<Produto[]> {
    const response = await apiServerFetch("/produtos");
    if (!response.ok) return [];
    return response.json();
}

export async function getProduto(id: number): Promise<Produto | null> {
    const response = await apiServerFetch(`/produtos/${id}`);
    if (!response.ok) return null;
    return response.json();
}

export async function criarProduto(produto: NovoProduto): Promise<Produto | { error: string }> {
    try {
        const response = await apiServerFetch("/produtos", {
            method: "POST",
            body: JSON.stringify(produto),
        });
        
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            return { error: err.message || "Erro ao criar produto" };
        }
        
        revalidatePath("/produtos");
        return response.json();
    } catch (error: any) {
        return { error: error.message || "Erro ao criar produto" };
    }
}

export async function atualizarProduto(id: number, produto: Partial<NovoProduto>): Promise<Produto | { error: string }> {
    try {
        const response = await apiServerFetch(`/produtos/${id}`, {
            method: "PATCH",
            body: JSON.stringify(produto),
        });
        
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            return { error: err.message || "Erro ao atualizar produto" };
        }
        
        revalidatePath("/produtos");
        return response.json();
    } catch (error: any) {
        return { error: error.message || "Erro ao atualizar produto" };
    }
}

export async function excluirProduto(id: number): Promise<boolean | { error: string }> {
    try {
        const response = await apiServerFetch(`/produtos/${id}`, {
            method: "DELETE",
        });
        
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            return { error: err.message || "Erro ao excluir produto" };
        }
        
        revalidatePath("/produtos");
        return true;
    } catch (error: any) {
        return { error: error.message || "Erro ao excluir produto" };
    }
}
