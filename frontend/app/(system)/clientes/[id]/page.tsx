"use client";

import React, { useState, useEffect, use } from 'react';
import { Cliente } from '@/types/clientes';
import { useRouter } from 'next/navigation';
import { getCliente, atualizarCliente, excluirCliente } from '../actions';
import Link from 'next/link';

export default function EditarClientePage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const clienteId = Number(id);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<Partial<Cliente>>({});

    useEffect(() => {
        if (!clienteId) return;
        
        getCliente(clienteId).then((data) => {
            if (data) {
                setFormData(data);
            } else {
                setError("Cliente não encontrado.");
            }
            setFetching(false);
        }).catch(err => {
            setError(err.message || "Erro ao carregar cliente.");
            setFetching(false);
        });
    }, [clienteId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const response = await atualizarCliente(clienteId, formData);

        if (response && 'error' in response) {
            setError(response.error as string);
            setLoading(false);
        } else {
            router.push('/clientes');
        }
    }

    const handleExcluir = async () => {
        if (!confirm("Tem certeza que deseja excluir este cliente?")) return;
        
        setLoading(true);
        const response = await excluirCliente(clienteId);
        if (typeof response === 'object' && 'error' in response) {
            setError(response.error);
            setLoading(false);
        } else {
            router.push('/clientes');
        }
    }

    if (fetching) return <div className="text-center py-5">Carregando cliente...</div>;
    if (error && !formData.nome) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="card shadow-sm max-w-2xl mx-auto" style={{ maxWidth: "600px" }}>
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Editar Cliente</h3>
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
                            <label className="form-label">Documento (CPF/CNPJ)</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.documento || ""}
                                onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Telefone</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.telefone || ""}
                                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={formData.email || ""}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Observações</label>
                        <textarea
                            className="form-control"
                            rows={3}
                            value={formData.observacoes || ""}
                            onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                        />
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <Link href="/clientes" className="btn btn-secondary">
                            Cancelar
                        </Link>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Salvando..." : "Atualizar Cliente"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
