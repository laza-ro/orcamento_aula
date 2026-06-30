# Guia de Estudo - Sistema de Orçamentos

Este guia foi criado para te ajudar a entender o que precisa ser construído no projeto e te dar os primeiros passos. Como você está estudando e pediu apenas exemplos e orientações (sem o código final), este arquivo serve como um "mapa" para o seu desenvolvimento.

## O que é necessário fazer?

De acordo com o `frontend/README.md`, o esqueleto do projeto (autenticação, login, proteção de rotas) já está pronto. Sua missão é construir as páginas internas e a estrutura visual do sistema:

1. **Estrutura Visual (Layout)**: 
   Você deve modificar o arquivo base das páginas internas para incluir um cabeçalho, um menu de navegação e um rodapé.
2. **Novas Páginas (Rotas)**:
   Você precisará criar as telas que vão listar e cadastrar os dados do sistema:
   - Produtos: `/produtos` (Listagem e Cadastro)
   - Clientes: `/clientes` (Listagem e Cadastro)
   - Orçamentos: `/orcamentos` (Listagem e Cadastro)
   - Perfil do Usuário: `/usuario`
3. **Tipagem e Conexão com a API**:
   - Criar as definições TypeScript (`interfaces`) na pasta `types/`.
   - Utilizar a função `apiServerFetch` (em `lib/api-server.ts`) para se comunicar com a API autenticada e buscar/salvar os dados.

---

## Exemplos para começar

Aqui estão alguns moldes e dicas de estrutura. Você deve preenchê-los com a lógica real, html/css e chamadas à API.

### 1. Criando a Moldura do Sistema (Layout)
O arquivo `frontend/app/(system)/layout.tsx` é a casca das páginas de quem já fez login. O que você colocar nele vai aparecer em todas as páginas (como `/home` e `/produtos`).

**Exemplo do que adicionar no `layout.tsx`:**
```tsx
import React from 'react';
import Link from 'next/link';

export default function SystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* 1. SEU CABEÇALHO E MENU AQUI */}
      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link href="/home" className="navbar-brand">Sistema de Orçamentos</Link>
          <nav>
             {/* Adicione os links de navegação para /produtos, /clientes, etc */}
             <Link href="/produtos" className="nav-link">Produtos</Link>
          </nav>
        </div>
      </header>

      {/* 2. ESTE É O CONTEÚDO DA PÁGINA (não mude isso!) */}
      <main className="container mt-4">
        {children}
      </main>

      {/* 3. SEU RODAPÉ AQUI */}
      <footer className="container mt-5">
        <p>Desenvolvido por você - 2026</p>
      </footer>
    </div>
  );
}
```

### 2. Criando uma nova Rota (ex: Produtos)
No Next.js (App Router), a URL é criada por pastas. Para criar a tela `/produtos`, você cria a pasta `produtos` dentro de `(system)` e um arquivo `page.tsx` dentro dela.

**Arquivo: `frontend/app/(system)/produtos/page.tsx`**
```tsx
import React from 'react';
import Link from 'next/link';
// import { apiServerFetch } from '@/lib/api-server';

export default async function ProdutosPage() {
  // FUTURO: Aqui você fará a busca dos produtos na API
  // const produtos = await apiServerFetch('/produtos');

  return (
    <div>
      <h1>Lista de Produtos</h1>
      
      {/* Exemplo de botão para ir para o cadastro */}
      <div className="mb-3">
        <Link href="/produtos/novo" className="btn btn-primary">
          Cadastrar Produto
        </Link>
      </div>
      
      {/* Espaço onde você montará a sua tabela de dados */}
      <p>Aqui você vai montar a tabela (table) iterando sobre os produtos...</p>
    </div>
  );
}
```

### 3. Tipando os Dados
Para facilitar o desenvolvimento, você precisa avisar ao TypeScript qual é o formato dos dados que vêm da API.

**Arquivo: `frontend/types/produto.ts` (você vai criar este arquivo)**
```typescript
export interface Produto {
  id: number;
  nome: string;
  // TODO: olhe o Swagger da API e adicione os outros campos (preco, descricao, etc.)
}
```

---

## Dicas para o Estudo

1. **Uma coisa de cada vez**: Escolha uma entidade, por exemplo "Produtos". Vá até o fim com ela (criar tela de listar, criar botão de novo, tela de cadastrar, enviar form pra API). Depois faça os outros.
2. **Consulte a API**: Mantenha o Swagger aberto (`http://localhost:3001/api/docs`). Ele é o "contrato" de como você deve enviar os dados (ex: quais são obrigatórios, se precisa ser número ou texto).
3. **Leia os arquivos prontos**: Leia o arquivo `lib/api-server.ts` para entender como o front faz requisições. O login (`app/(auth)/login/page.tsx`) é um bom lugar para aprender como submeter um formulário (Server Actions).
