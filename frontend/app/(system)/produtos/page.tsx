import Link from "next/link";
import { getProdutos } from "./actions";

export default async function ProdutosPage() {
    const produtos = await getProdutos();

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Produtos</h2>
                <Link href="/produtos/novo" className="btn btn-primary">
                    + Novo Produto
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Preço Unit.</th>
                            <th>Unidade</th>
                            <th>Status</th>
                            <th className="text-end">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center text-muted">
                                    Nenhum produto cadastrado.
                                </td>
                            </tr>
                        ) : (
                            produtos.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.codigo_sku || "-"}</td>
                                    <td>{p.nome}</td>
                                    <td>
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.preco_unitario)}
                                    </td>
                                    <td>{p.unidade}</td>
                                    <td>
                                        <span className={`badge ${p.ativo ? 'bg-success' : 'bg-danger'}`}>
                                            {p.ativo ? "Ativo" : "Inativo"}
                                        </span>
                                    </td>
                                    <td className="text-end">
                                        <Link href={`/produtos/${p.id}`} className="btn btn-sm btn-outline-primary">
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