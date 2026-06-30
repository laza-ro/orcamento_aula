"use client";

import React, { useState } from 'react';
import { NovoProduto } from '@/types/produtos';
import { apiServerFetch } from '@/lib/api-server';
import Link from 'next/link';

export default async function NovoProdutoPage() {


    const [formData, setFormData] = useState<NovoProduto>({
        nome: "",
        preco: 0,
        observacoes: "",
        quantidade: 0,
        unidade: "",
    })

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        return (
            <div>
                <h1>Novo Produto</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Preço</label>
                        <input
                            type="number"
                            className="form-control"
                            value={formData.preco}
                            onChange={(e) => setFormData({ ...formData, preco: Number(e.target.value) })}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Observações</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.observacoes}
                            onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Quantidade</label>
                        <input
                            type="number"
                            className="form-control"
                            value={formData.quantidade}
                            onChange={(e) => setFormData({ ...formData, quantidade: Number(e.target.value) })}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Unidade</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.unidade}
                            onChange={(e) => setFormData({ ...formData, unidade: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Salvar Produto</button>
                </form>
            </div>
        );
    }
}