# Como Criar um Orçamento no Next.js (Passo a Passo)

Sua dúvida foi: *"Para criar o orçamento eu devo chamar o botão novo orçamento, referenciar ele com o href e chamar a interface CriarOrcamento?"*

A resposta curta é **Sim e Não**. 

Você **vai** usar o `href` no botão para redirecionar o usuário para uma nova página (a tela de formulário). A interface `CriarOrcamento` **não é chamada como uma função**, ela serve apenas para **tipar (dar o formato esperado)** aos dados que você vai recolher nesse formulário antes de enviar para a API.

Aqui está o fluxo completo e correto de como isso deve ser feito no Next.js App Router:

## Passo 1: O Botão na Página de Listagem

No arquivo `frontend/app/(system)/orcamento/page.tsx`, o botão (usando o componente `<Link>` do Next.js) vai apenas mudar a URL do navegador para `/orcamento/novo`.

```tsx
// frontend/app/(system)/orcamento/page.tsx
import Link from "next/link";

export default async function OrcamentoPage() {
    return (
        <div>
            <h1>Orçamentos</h1>
            {/* 1. O Link redireciona para a página do formulário */}
            <Link href="/orcamento/novo" className="btn btn-primary">Novo Orçamento</Link>
            
            {/* ... tabela de orçamentos ... */}
        </div>
    )
}
```

## Passo 2: A Página com o Formulário (`/orcamento/novo`)

Você precisa criar uma nova pasta e um arquivo: `frontend/app/(system)/orcamento/novo/page.tsx`.
É nesta página que o usuário vai preencher os dados. Como precisamos lidar com interatividade (digitar no formulário, clicar em salvar), normalmente usamos um **Client Component** (adicionando `"use client"` no topo).

Aqui entra a sua interface `CriarOrcamento`. Você usa ela para garantir que os dados que você está enviando para a API estão no formato correto.

```tsx
// frontend/app/(system)/orcamento/novo/page.tsx
"use client"; // Necessário porque o formulário tem interatividade no navegador

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// 2. Importamos a interface para "tipar" os dados
import { CriarOrcamento } from '@/types/orcamento'; 

export default function NovoOrcamentoPage() {
  const router = useRouter();

  // 3. O estado do formulário segue o formato da interface CriarOrcamento
  // O TypeScript vai te avisar se faltar algum campo obrigatório!
  const [formData, setFormData] = useState<CriarOrcamento>({
    clienteId: 0,
    produtosId: [],
    data_criacao: new Date(),
    data_vencimento: new Date(),
    valor_total: 0,
    status: { status: 'pendente' },
    observacoes: '',
  });

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 4. Envia os dados para a sua API NestJS
      // ATENÇÃO: Em Client Components, você usaria o fetch normal chamando a rota do seu backend,
      // ou chamaria uma Server Action que por sua vez chama o `apiServerFetch`.
      const response = await fetch('http://localhost:3001/api/orcamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Aqui você precisaria enviar o Token JWT também (Authorization: Bearer <token>)
        },
        body: JSON.stringify(formData) // formData já está validado pela interface CriarOrcamento
      });

      if (response.ok) {
        alert('Orçamento criado com sucesso!');
        router.push('/orcamento'); // Redireciona de volta para a lista
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  return (
    <div>
      <h1>Criar Novo Orçamento</h1>
      <form onSubmit={handleSubmit}>
        
        {/* Exemplo de campo de observação */}
        <div className="mb-3">
          <label>Observações</label>
          <textarea 
            className="form-control"
            value={formData.observacoes}
            onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
          />
        </div>

        {/* 
            Aqui você adicionaria os selects para Cliente, Produtos, etc. 
            Você precisaria buscar a lista de clientes e produtos do backend para preencher os <select>
        */}

        <button type="submit" className="btn btn-success">Salvar Orçamento</button>
      </form>
    </div>
  );
}
```

## Resumo do papel de cada coisa:

1. **O Botão (`<Link href="...">`)**: Serve apenas para levar o usuário de uma tela (`/orcamento`) para a outra (`/orcamento/novo`).
2. **O Formulário**: Pega o que o usuário digitou e guarda em uma variável de estado (`formData`).
3. **A Interface (`CriarOrcamento`)**: Funciona como um "contrato". Ela diz para o TypeScript: *"O estado `formData` obrigatoriamente precisa ter um clienteId, um array de produtosId, etc."*. Se você tentar salvar o `formData` sem o `clienteId`, seu código vai ficar com um erro vermelho te avisando antes mesmo de você tentar rodar.
4. **O Fetch / API**: Pega os dados tipados pela interface e envia para o backend salvar no banco de dados.
