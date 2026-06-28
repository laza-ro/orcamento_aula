export interface Usuario {
    id: number;
    nome: string;
    email: string;
    ativo: boolean;
}

export interface CriarUsuario {
    nome: string;
    email: string;
    senha: string;
    ativo: boolean;
}

export interface AtualizarUsuario {
    nome: string;
    email: string;
    senha: string;
    ativo: boolean;
}

export interface EncontrarUsuario {
    id: number;
    nome: string;
    email: string;
    ativo: boolean;
}

export type ListaUsuarios = EncontrarUsuario[];

export type RespostaApi = {
    sucesso: boolean;
    dados: ListaUsuarios | EncontrarUsuario | string | null;
}