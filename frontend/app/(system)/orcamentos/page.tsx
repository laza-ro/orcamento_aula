import Link from "next/link";
import { getOrcamentos } from "./action";

export default async function OrcamentosPage() {
    const orcamentos = await getOrcamentos();

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Orçamentos</h2>
                <Link href="/orcamentos/novo" className="btn btn-primary">
                    + Novo Orçamento
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Data</th>
                            <th>Valor Total</th>
                            <th>Status</th>
                            <th className="text-end">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orcamentos.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center text-muted">
                                    Nenhum orçamento cadastrado.
                                </td>
                            </tr>
                        ) : (
                            orcamentos.map((o) => (
                                <tr key={o.id}>
                                    <td>#{o.id}</td>
                                    <td>{o.cliente?.nome || `ID: ${o.clienteId}`}</td>
                                    <td>{o.criadoEm ? new Date(o.criadoEm).toLocaleDateString('pt-BR') : "-"}</td>
                                    <td>
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(o.total)}
                                    </td>
                                    <td>
                                        <span className={`badge ${
                                            o.situacao === 'aprovado' ? 'bg-success' : 
                                            o.situacao === 'pendente' ? 'bg-warning text-dark' : 
                                            o.situacao === 'cancelado' || o.situacao === 'rejeitado' ? 'bg-danger' : 
                                            'bg-info'
                                        }`}>
                                            {o.situacao.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="text-end">
                                        <Link href={`/orcamentos/${o.id}`} className="btn btn-sm btn-outline-primary">
                                            Visualizar / Editar
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}