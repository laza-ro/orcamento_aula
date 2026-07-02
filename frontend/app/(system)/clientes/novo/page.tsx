"use client";

import React, { useState } from 'react';
import { NovoCliente } from '@/types/clientes';
import { useRouter } from 'next/navigation';
import { criarCliente } from '../actions';
import Link from 'next/link';

export default function NovoClientePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<NovoCliente>({
        nome: "",
        documento: "",
        email: "",
        telefone: "",
        observacoes: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const response = await criarCliente(formData);

        if ('error' in response) {
            setError(response.error);
            setLoading(false);
        } else {
            router.push('/clientes');
        }
    }

    return (
        <div className="card shadow-sm max-w-2xl mx-auto" style={{ maxWidth: "600px" }}>
            <div className="card-header bg-white">
                <h3 className="mb-0">Novo Cliente</h3>
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
                            value={formData.nome}
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
                            {loading ? "Salvando..." : "Salvar Cliente"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
