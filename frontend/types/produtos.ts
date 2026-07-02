export type Produto = {
    id?: number | undefined | null;
    codigo_sku?: string | null;
    nome: string;
    descricao?: string | null;
    preco_unitario: number;
    unidade?: string;
    ativo?: boolean;
    criado_em?: string | Date;
    atualizado_em?: string | Date;
};

export type NovoProduto = {
    codigo_sku?: string | null;
    nome: string;
    descricao?: string | null;
    preco_unitario: number;
    unidade?: string;
    ativo?: boolean;
};