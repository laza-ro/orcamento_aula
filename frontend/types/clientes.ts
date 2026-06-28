export interface Cliente {
    id: number;
    nome: string;
    email?: string;
    telefone?: string;
}

export interface CriarCliente {
    nome: string;
    email?: string;
    telefone?: string;
}

export interface AtualizarCliente {
    nome: string;
    email?: string;
    telefone?: string;
}

export interface EncontrarCliente {
    id: number;
    nome: string;
    email?: string;
    telefone?: string;
}

export type ListaClientes = EncontrarCliente[];

export type RespostaApi = {
    sucesso: boolean;
    dados: ListaClientes | EncontrarCliente | string | null;
}
