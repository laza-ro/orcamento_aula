import { Cliente } from './clientes';
import { Produto } from './produtos';
import { Usuario } from './usuarios';


export interface Orcamento {
    id: number;
    cliente: Cliente['nome'];
    ClienteId: Cliente['id'];
    data_criacao: Date;
    data_vencimento: Date;
    valor_total: number;
    status: OrcamentoStatus;
    observacoes?: string;
    itens?: OrcamentoItem[];
}

export interface CriarOrcamento {
    clienteId: number;
    produtosId: number[];
    data_criacao: Date;
    data_vencimento: Date;
    valor_total: number;
    status: OrcamentoStatus;
    observacoes?: string;
    itens?: OrcamentoItem[];
}

export interface AtualizarOrcamento {
    id: number;
    clienteId: number;
    produtosId: number[];
    data_criacao: Date;
    data_vencimento: Date;
    valor_total: number;
    status: OrcamentoStatus;
    observacoes?: string;
    itens?: OrcamentoItem[];
}

export interface OrcamentoStatus {
    status: 'pendente' | 'aprovado' | 'rejeitado';
}

export interface OrcamentoItem {
    id: number;
    nome: Produto['nome'];
    ProdutoId: Produto['id'];
    quantidade: number;
    valor_unitario: number;
    valor_total: number;
    OrcamentoId: Orcamento['id'];
}

export interface EncontrarOrcamento {
    id: number;
    cliente: Cliente['nome'];
    ClienteId: Cliente['id'];
    data_criacao: Date;
    data_vencimento: Date;
    valor_total: number;
    status: OrcamentoStatus;
    observacoes?: string;
    itens?: OrcamentoItem[];
}

export type ListaOrcamentos = EncontrarOrcamento[];

export type RespostaApi = {
    sucesso: boolean;
    dados: ListaOrcamentos | EncontrarOrcamento | string | null;
}