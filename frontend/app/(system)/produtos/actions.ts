"use server";

import { apiServerFetch } from "@/lib/api-server";

export default async function BuscarProdutos() {
    try {
        const response = await apiServerFetch('/produtos', {
            method: 'POST',
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Produto criado com sucesso!');
            <Link href="/produtos" />;
        }
    } catch (error) {
        console.error("Erro ao salvar:", error);
    }
}
