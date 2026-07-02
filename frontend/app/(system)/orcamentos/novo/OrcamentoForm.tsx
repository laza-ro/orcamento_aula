"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cliente } from '@/types/clientes';
import { Produto } from '@/types/produtos';
import { CriarOrcamentoPayload, ItemOrcamentoInput } from '@/types/orcamentos';
import { criarOrcamento } from '../action';
import Link from 'next/link';

interface OrcamentoFormProps {
    clientes: Cliente[];
    produtos: Produto[];
}

export default function OrcamentoForm({ clientes, produtos }: OrcamentoFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [clienteId, setClienteId] = useState<number | ''>('');
    const [itens, setItens] = useState<ItemOrcamentoInput[]>([]);
    const [observacoes, setObservacoes] = useState('');
    const [valorDesconto, setValorDesconto] = useState(0);
    const [validoAte, setValidoAte] = useState('');

    // Estado temporário para adicionar novo item
    const [produtoSelecionado, setProdutoSelecionado] = useState<number | ''>('');
    const [quantidade, setQuantidade] = useState<number>(1);

    const adicionarItem = () => {
        if (!produtoSelecionado || quantidade <= 0) return;
        
        const produtoInfo = produtos.find(p => p.id === produtoSelecionado);
        if (!produtoInfo) return;

        // Verifica se já existe, se sim só soma a quantidade
        const itemExistente = itens.find(i => i.produtoId === produtoSelecionado);
        if (itemExistente) {
            setItens(itens.map(i => 
                i.produtoId === produtoSelecionado 
                    ? { ...i, quantidade: i.quantidade + quantidade } 
                    : i
            ));
        } else {
            setItens([...itens, { 
                produtoId: produtoSelecionado, 
                quantidade,
                precoUnitario: produtoInfo.preco_unitario // Pega o preço atual
            }]);
        }

        // Reseta o form de item
        setProdutoSelecionado('');
        setQuantidade(1);
    };

    const removerItem = (produtoId: number) => {
        setItens(itens.filter(i => i.produtoId !== produtoId));
    };

    const subtotal = itens.reduce((acc, item) => {
        const prod = produtos.find(p => p.id === item.produtoId);
        return acc + (prod ? prod.preco_unitario * item.quantidade : 0);
    }, 0);

    const total = subtotal - valorDesconto;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!clienteId) {
            setError("Selecione um cliente.");
            return;
        }
        
        if (itens.length === 0) {
            setError("Adicione pelo menos um produto ao orçamento.");
            return;
        }

        setLoading(true);
        setError(null);

        const payload: CriarOrcamentoPayload = {
            clienteId: Number(clienteId),
            itens,
            valorDesconto,
            observacoes,
            validoAte: validoAte ? new Date(validoAte).toISOString() : undefined,
        };

        const response = await criarOrcamento(payload);

        if (response && 'error' in response) {
            setError(response.error as string);
            setLoading(false);
        } else {
            router.push('/orcamentos');
        }
    };

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <h5 className="border-bottom pb-2 mb-3">Dados Gerais</h5>
                    <div className="row mb-4">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Cliente *</label>
                            <select 
                                className="form-select" 
                                required
                                value={clienteId}
                                onChange={(e) => setClienteId(e.target.value === '' ? '' : Number(e.target.value))}
                            >
                                <option value="">Selecione um cliente...</option>
                                {clientes.map(c => (
                                    <option key={c.id} value={c.id ?? ''}>{c.nome} - {c.documento}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Válido Até</label>
                            <input 
                                type="date" 
                                className="form-control"
                                value={validoAte}
                                onChange={(e) => setValidoAte(e.target.value)}
                            />
                        </div>
                    </div>

                    <h5 className="border-bottom pb-2 mb-3">Itens do Orçamento</h5>
                    <div className="bg-light p-3 rounded mb-3">
                        <div className="row align-items-end">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="form-label">Produto</label>
                                <select 
                                    className="form-select"
                                    value={produtoSelecionado}
                                    onChange={(e) => setProdutoSelecionado(e.target.value === '' ? '' : Number(e.target.value))}
                                >
                                    <option value="">Selecione um produto...</option>
                                    {produtos.map(p => (
                                        <option key={p.id} value={p.id ?? ''}>
                                            {p.codigo_sku ? `[${p.codigo_sku}] ` : ''}{p.nome} - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.preco_unitario)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3 mb-3 mb-md-0">
                                <label className="form-label">Quantidade</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    min="0.1" 
                                    step="any"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(Number(e.target.value))}
                                />
                            </div>
                            <div className="col-md-3">
                                <button 
                                    type="button" 
                                    className="btn btn-outline-success w-100"
                                    onClick={adicionarItem}
                                    disabled={!produtoSelecionado || quantidade <= 0}
                                >
                                    + Adicionar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive mb-4">
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th>Produto</th>
                                    <th>Quant.</th>
                                    <th>Preço Unit.</th>
                                    <th>Total Linha</th>
                                    <th className="text-center" style={{ width: '80px' }}>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itens.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center text-muted">
                                            Nenhum item adicionado.
                                        </td>
                                    </tr>
                                ) : (
                                    itens.map(item => {
                                        const prod = produtos.find(p => p.id === item.produtoId);
                                        const preco = prod ? prod.preco_unitario : 0;
                                        const totalLinha = preco * item.quantidade;
                                        return (
                                            <tr key={item.produtoId}>
                                                <td>{prod?.nome}</td>
                                                <td>{item.quantidade}</td>
                                                <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco)}</td>
                                                <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalLinha)}</td>
                                                <td className="text-center">
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => removerItem(item.produtoId)}
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Observações</label>
                            <textarea 
                                className="form-control" 
                                rows={4}
                                value={observacoes}
                                onChange={(e) => setObservacoes(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="col-md-6">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Subtotal:</span>
                                        <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}</strong>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span>Desconto (R$):</span>
                                        <input 
                                            type="number" 
                                            className="form-control form-control-sm w-50 text-end" 
                                            min="0"
                                            step="0.01"
                                            value={valorDesconto}
                                            onChange={(e) => setValorDesconto(Number(e.target.value))}
                                        />
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between align-items-center mb-0">
                                        <span className="fs-5 fw-bold">Total:</span>
                                        <span className="fs-5 fw-bold text-primary">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <Link href="/orcamentos" className="btn btn-secondary">
                            Cancelar
                        </Link>
                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading || itens.length === 0}>
                            {loading ? "Salvando..." : "Salvar Orçamento"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
