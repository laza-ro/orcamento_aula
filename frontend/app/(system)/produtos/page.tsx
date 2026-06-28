import react from "react";
import Link from "next/link";
import apiServerFetch from "@/lib/apiServerFetch";


export default async function ProdutosPage() {
    const produtos = await apiServerFetch('/produtos');
    return (
        <h1>Lista de Produtos</h1>

    );

}