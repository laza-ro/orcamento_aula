"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cliente } from '@/types/clientes';
import { Produto } from '@/types/produtos';
import { AtualizarOrcamentoPayload, Orcamento, SituacaoOrcamento } from '@/types/orcamentos';
import { atualizarOrcamento } from '../action';
import Link from 'next/link';

interface OrcamentoEditFormProps {
    orcamento: Orcamento;
    clientes: Cliente[];
    produtos: Produto[];
}

export default function OrcamentoEditForm({ orcamento, clientes, produtos }: OrcamentoEditFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [situacao, setSituacao] = useState<SituacaoOrcamento>(orcamento.situacao);
    const [observacoes, setObservacoes] = useState(orcamento.observacoes || '');

    // Para edição simples, vamos permitir alterar o status e as observações.
    // Alterar itens de um orçamento aprovado não é o padrão de mercado, 
    // então focaremos em status e observações para a edição, ou desconto.
    // Opcional: Se quiser, a lógica completa de itens pode ser implementada.
    const [valorDesconto, setValorDesconto] = useState(orcamento.valorDesconto);
    
    // Calcula totais atuais baseados nos itens reais que vieram da API
    const subtotal = orcamento.itens.reduce((acc, i) => acc + i.totalLinha, 0);
    const total = subtotal - valorDesconto;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setLoading(true);
        setError(null);

        const payload: AtualizarOrcamentoPayload = {
            situacao,
            observacoes,
            valorDesconto
        };

        const response = await atualizarOrcamento(orcamento.id, payload);

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
                            <label className="form-label">Cliente</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                disabled
                                value={orcamento.cliente?.nome || `Cliente ID: ${orcamento.clienteId}`}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Situação</label>
                            <select 
                                className="form-select" 
                                value={situacao}
                                onChange={(e) => setSituacao(e.target.value as SituacaoOrcamento)}
                            >
                                <option value="pendente">Pendente</option>
                                <option value="enviado">Enviado</option>
                                <option value="aprovado">Aprovado</option>
                                <option value="rejeitado">Rejeitado</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </div>
                    </div>

                    <h5 className="border-bottom pb-2 mb-3">Itens do Orçamento (Apenas Leitura)</h5>
                    <div className="table-responsive mb-4">
                        <table className="table table-bordered table-sm">
                            <thead className="table-light">
                                <tr>
                                    <th>Produto</th>
                                    <th>Quant.</th>
                                    <th>Preço Unit.</th>
                                    <th>Total Linha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orcamento.itens.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center text-muted">
                                            Nenhum item cadastrado.
                                        </td>
                                    </tr>
                                ) : (
                                    orcamento.itens.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.nomeProdutoRegistro}</td>
                                            <td>{item.quantidade}</td>
                                            <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.precoUnitarioRegistro)}</td>
                                            <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.totalLinha)}</td>
                                        </tr>
                                    ))
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
                                            disabled={situacao === 'cancelado' || situacao === 'rejeitado' || situacao === 'aprovado'}
                                        />
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between align-items-center mb-0">
                                        <span className="fs-5 fw-bold">Total Final:</span>
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
                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                            {loading ? "Salvando..." : "Atualizar Orçamento"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
