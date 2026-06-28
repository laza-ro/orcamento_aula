export interface Produto {
    id: number;
    nome: string;
    preco: number;
    descricao?: string;
}

export interface NovoProduto {
    nome: string;
    preco: number;
    descricao?: string;
}

export interface UpdateProduto {
    nome: string;
    preco: number;
    descricao?: string;
}

export interface DeleteProduto {
    id: number;
}

export interface EncontrarProduto {
    id: number;
    nome: string;
    preco: number;
    descricao?: string;
}

export type ListaProdutos = EncontrarProduto[];

export type RespostaApi = {
    sucesso: boolean;
    dados: ListaProdutos | EncontrarProduto | string | null;
}