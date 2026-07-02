"use client";

import React, { useState, useEffect, use } from 'react';
import { Produto } from '@/types/produtos';
import { useRouter } from 'next/navigation';
import { getProduto, atualizarProduto, excluirProduto } from '../actions';
import Link from 'next/link';

export default function EditarProdutoPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const produtoId = Number(id);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<Partial<Produto>>({});

    useEffect(() => {
        if (!produtoId) return;
        
        getProduto(produtoId).then((data) => {
            if (data) {
                setFormData(data);
            } else {
                setError("Produto não encontrado.");
            }
            setFetching(false);
        }).catch(err => {
            setError(err.message || "Erro ao carregar produto.");
            setFetching(false);
        });
    }, [produtoId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const response = await atualizarProduto(produtoId, formData);

        if (response && 'error' in response) {
            setError(response.error as string);
            setLoading(false);
        } else {
            router.push('/produtos');
        }
    }

    const handleExcluir = async () => {
        if (!confirm("Tem certeza que deseja excluir este produto?")) return;
        
        setLoading(true);
        const response = await excluirProduto(produtoId);
        if (typeof response === 'object' && 'error' in response) {
            setError(response.error);
            setLoading(false);
        } else {
            router.push('/produtos');
        }
    }

    if (fetching) return <div className="text-center py-5">Carregando produto...</div>;
    if (error && !formData.nome) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="card shadow-sm max-w-2xl mx-auto" style={{ maxWidth: "600px" }}>
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Editar Produto</h3>
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={handleExcluir} disabled={loading}>
                    Excluir
                </button>
            </div>
            <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nome *</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={formData.nome || ""}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        />
                    </div>
                    
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Código (SKU)</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.codigo_sku || ""}
                                onChange={(e) => setFormData({ ...formData, codigo_sku: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Unidade *</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={formData.unidade || ""}
                                onChange={(e) => setFormData({ ...formData, unidade: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Preço Unitário (R$) *</label>
                        <input
                            type="number"
                            required
                            step="0.01"
                            min="0"
                            className="form-control"
                            value={formData.preco_unitario || 0}
                            onChange={(e) => setFormData({ ...formData, preco_unitario: Number(e.target.value) })}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Descrição</label>
                        <textarea
                            className="form-control"
                            rows={3}
                            value={formData.descricao || ""}
                            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                        />
                    </div>

                    <div className="mb-4 form-check form-switch">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            role="switch" 
                            id="ativoSwitch"
                            checked={formData.ativo ?? true}
                            onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="ativoSwitch">Produto Ativo</label>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <Link href="/produtos" className="btn btn-secondary">
                            Cancelar
                        </Link>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Salvando..." : "Atualizar Produto"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
