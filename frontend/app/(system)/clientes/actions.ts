"use server";

import { apiServerFetch } from "@/lib/api-server";
import { Cliente, NovoCliente } from "@/types/clientes";
import { revalidatePath } from "next/cache";

export async function getClientes(): Promise<Cliente[]> {
    const response = await apiServerFetch("/clientes");
    if (!response.ok) return [];
    return response.json();
}

export async function getCliente(id: number): Promise<Cliente | null> {
    const response = await apiServerFetch(`/clientes/${id}`);
    if (!response.ok) return null;
    return response.json();
}

export async function criarCliente(cliente: NovoCliente): Promise<Cliente | { error: string }> {
    try {
        const response = await apiServerFetch("/clientes", {
            method: "POST",
            body: JSON.stringify(cliente),
        });
        
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            return { error: err.message || "Erro ao criar cliente" };
        }
        
        revalidatePath("/clientes");
        return response.json();
    } catch (error: any) {
        return { error: error.message || "Erro ao criar cliente" };
    }
}

export async function atualizarCliente(id: number, cliente: Partial<NovoCliente>): Promise<Cliente | { error: string }> {
    try {
        const response = await apiServerFetch(`/clientes/${id}`, {
            method: "PATCH",
            body: JSON.stringify(cliente),
        });
        
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            return { error: err.message || "Erro ao atualizar cliente" };
        }
        
        revalidatePath("/clientes");
        return response.json();
    } catch (error: any) {
        return { error: error.message || "Erro ao atualizar cliente" };
    }
}

export async function excluirCliente(id: number): Promise<boolean | { error: string }> {
    try {
        const response = await apiServerFetch(`/clientes/${id}`, {
            method: "DELETE",
        });
        
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            return { error: err.message || "Erro ao excluir cliente" };
        }
        
        revalidatePath("/clientes");
        return true;
    } catch (error: any) {
        return { error: error.message || "Erro ao excluir cliente" };
    }
}
