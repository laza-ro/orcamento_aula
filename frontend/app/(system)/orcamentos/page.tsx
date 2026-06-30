import react from "react";
import Link from "next/link";
import { apiServerFetch } from "@/lib/api-server";

export default async function OrcamentoPage() {
    const orcamentos = await apiServerFetch('/orcamentos');
    return (
        <div>
            <h1>Orçamentos</h1>
            <Link href="/orcamentos/novo">Novo Orçamento</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Data de criação</th>
                        <th>Data de vencimento</th>
                        <th>Valor total</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>

        </div>
    )
}