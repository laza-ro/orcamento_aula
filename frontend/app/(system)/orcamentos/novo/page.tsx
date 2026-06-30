"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CriarOrcamento } from '@/types/orcamentos';

export default function NovoOrcamentoPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<CriarOrcamento>({
        clienteId: 0,
        produtosId: [],
        data_criacao: new Date(),
        data_vencimento: new Date(),
        valor_total: 0,
        status: { status: 'pendente' },
        observacoes: '',
    });

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/orcamento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Orçamento criado com sucesso!');
                router.push('/orcamento ');
            }
        } catch (error) {
            console.error("Erro ao salvar:", error);
        }
    };

    return (
        <div>
            <h1>Criar Novo Orçamento</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Cliente</label>
                    <select name="clienteId" id="clienteId">
                        <option value="">Selecione um cliente</option>
                        <option value="1"></option>
                        <option value="2"></option>
                    </select>

                </div>
                <div className="mb-3">
                    <label>Observações</label>
                    <textarea
                        className="form-control"
                        value={formData.observacoes}
                        onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                    />
                </div>

                <button type="submit" className="btn btn-success">Salvar Orçamento</button>
            </form>
        </div>
    );
}