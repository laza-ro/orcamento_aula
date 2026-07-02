import Link from "next/link";
import { getClientes } from "./actions";

export default async function ClientesPage() {
    const clientes = await getClientes();

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Clientes</h2>
                <Link href="/clientes/novo" className="btn btn-primary">
                    + Novo Cliente
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Nome</th>
                            <th>Documento</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th className="text-end">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center text-muted">
                                    Nenhum cliente cadastrado.
                                </td>
                            </tr>
                        ) : (
                            clientes.map((c) => (
                                <tr key={c.id}>
                                    <td>{c.nome}</td>
                                    <td>{c.documento || "-"}</td>
                                    <td>{c.email || "-"}</td>
                                    <td>{c.telefone || "-"}</td>
                                    <td className="text-end">
                                        <Link href={`/clientes/${c.id}`} className="btn btn-sm btn-outline-primary">
                                            Editar
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
