import { getClientes } from "../../clientes/actions";
import { getProdutos } from "../../produtos/actions";
import OrcamentoForm from "./OrcamentoForm";

export default async function NovoOrcamentoPage() {
    const clientes = await getClientes();
    const produtos = await getProdutos();

    // Filtra apenas produtos ativos para o select
    const produtosAtivos = produtos.filter(p => p.ativo);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Novo Orçamento</h2>
            </div>

            <OrcamentoForm clientes={clientes} produtos={produtosAtivos} />
        </div>
    );
}