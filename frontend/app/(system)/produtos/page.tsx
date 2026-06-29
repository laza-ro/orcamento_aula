import react from "react";
import Link from "next/link";
import { apiServerFetch } from "@/lib/api-server";

export default async function ProdutosPage() {
    const produtos = await apiServerFetch('/produtos');
    return (
        <div>
            <h1>Lista de Produtos</h1>
            <Link href="/produtos/novo" className="btn btn-primary">Cadastrar</Link>
        </div>
    );

}