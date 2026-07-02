import { getClientes } from "../../clientes/actions";
import { getProdutos } from "../../produtos/actions";
import { getOrcamento } from "../action";
import OrcamentoEditForm from "./OrcamentoEditForm";

export default async function EditarOrcamentoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const orcamentoId = Number(id);

    const [clientes, produtos, orcamento] = await Promise.all([
        getClientes(),
        getProdutos(),
        getOrcamento(orcamentoId)
    ]);

    if (!orcamento) {
        return <div className="alert alert-danger">Orçamento não encontrado.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Editar Orçamento #{orcamento.id}</h2>
            </div>
            
            <OrcamentoEditForm 
                orcamento={orcamento}
                clientes={clientes} 
                produtos={produtos} 
            />
        </div>
    );
}
