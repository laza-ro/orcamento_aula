# 📚 Guia de Estudo e Documentação do Projeto

Este documento foi elaborado para te ajudar a entender como a entrega final do **Sistema de Orçamentos** foi implementada. Ele detalha as decisões técnicas tomadas, como o código foi organizado e sugere melhorias para estudos futuros.

---

## 1. O que foi feito?

Para atender aos critérios de avaliação da disciplina, focamos em entregar um sistema simples, funcional e com aparência clássica (utilizando o Bootstrap, que já estava instalado no projeto), sem exageros visuais.

As seguintes entregas foram concluídas:

1. **Frontpage (/) implementada:** A tela inicial do sistema (pós-login) em `/home` foi estilizada usando classes utilitárias do Bootstrap (como `p-5 bg-light rounded-3`) para criar um "painel de boas-vindas" ("Jumbotron" style) simples e limpo.
2. **Layout Global (Header/Footer):**
   - Refizemos o `Header` em `components/Header/index.tsx` para ser um `navbar` oficial do Bootstrap, que é responsivo e abriga os menus para todas as entidades.
   - Criamos o `Footer` e o amarramos junto ao Header dentro do `app/(system)/layout.tsx`, usando Flexbox (`d-flex flex-column min-vh-100`) para garantir que o rodapé fique sempre na base da tela.
3. **Tipagens (Interfaces):** Atualizamos os arquivos em `types/produtos.ts` e `types/clientes.ts` para refletir as entradas que o formulário iria gerar (`NovoProduto`, `NovoCliente`), ajudando o TypeScript a avisar sobre erros antes mesmo de rodarmos a aplicação.
4. **CRUD de Produtos e Clientes:**
   - Criamos arquivos de **Server Actions** (`actions.ts`) que centralizam a comunicação com o Backend.
   - Dividimos em três telas: 
     - `/page.tsx` (Lista em Tabela)
     - `/novo/page.tsx` (Formulário de Criação)
     - `/[id]/page.tsx` (Formulário de Edição e Exclusão)
5. **CRUD de Orçamentos:**
   - **Desafio:** Diferente dos outros, o orçamento depende de Clientes e Produtos. 
   - **Solução:** Na tela de criar (`orcamentos/novo/page.tsx`), que é um *Server Component*, nós fazemos o fetch (`getClientes` e `getProdutos`) e passamos esses dados como "props" para um *Client Component* (`OrcamentoForm.tsx`). 
   - O `OrcamentoForm` usa o estado (`useState`) do React para gerenciar um array dinâmico de itens (`itens`), calculando o total automaticamente via `reduce()`.

---

## 2. Como as tecnologias foram utilizadas?

### Server Components vs Client Components (Next.js App Router)
No Next.js moderno (App Router), por padrão todo arquivo é executado no Servidor. 
- Usamos componentes **Server** para as listagens (`/produtos/page.tsx`). Vantagem: o HTML já desce pronto para o navegador e é mais rápido.
- Usamos a flag `"use client";` no topo das páginas de formulários. Como formulários precisam de interação do usuário (clicar, digitar, `useState`), eles precisam rodar no navegador (Client).

### Server Actions (`actions.ts`)
Para não precisarmos criar rotas de API no Next.js (ex: `app/api/produtos`), utilizamos o "use server". Isso permitiu criarmos funções em `actions.ts` que rodam de forma segura no Node.js e que podem ser chamadas diretamente pelos formulários (ou via `fetch`). Além disso, ao fim de uma ação (como Salvar), usamos `revalidatePath('/produtos')` para limpar o cache da página e exibir os dados novos imediatamente.

---

## 3. Como eu poderia ter feito diferente? (Alternativas)

1. **Uso de Bibliotecas de Formulário:**
   Nós fizemos a validação e o estado "na mão" usando `useState`. Em sistemas reais do mercado, costuma-se usar bibliotecas como **React Hook Form** junto com **Zod**. Isso reduziria a quantidade de código e a repetição de `onChange={(e) => setFormData(...)}`.

2. **Bibliotecas de Tabela e Paginação:**
   Fizemos uma tabela simples HTML. Quando você tiver 10.000 clientes, isso vai travar o navegador. O ideal seria ter implementado uma tabela com paginação Server-Side usando o componente de paginação do Bootstrap, passando parâmetros `?page=1` para a API.

3. **Arquitetura de Componentes Base:**
   Para não repetir o mesmo HTML de formulário (input text, input number), eu poderia ter criado componentes reutilizáveis, tipo `<InputText label="Nome" value={...} />`, deixando os arquivos de páginas muito menores.

---

## 4. Sugestão de Melhorias (Para explorar no futuro)

Se você quiser expandir este projeto para estudos após entregar a disciplina, recomendo:

- **Dashboard:** Implemente a tela `/home` chamando os endpoints de relatórios da API usando bibliotecas de gráficos como `Recharts` ou `Chart.js`.
- **Filtros e Buscas:** Adicione um input de texto acima da tabela de clientes para buscar por nome (filtrando no array ou mandando para a API).
- **Toast Notifications:** No lugar de usar `alert()` padrão do navegador ou div de erro, implemente a biblioteca `sonner` (que já está no `package.json`) para exibir notificações bonitas no canto da tela ao salvar um dado com sucesso.
- **Botão de Imprimir Orçamento:** Adicione uma funcionalidade na edição de orçamento que gera um PDF (usando `react-pdf`) com os dados do orçamento e itens para entregar fisicamente ao cliente.

**Bons estudos e sucesso na sua apresentação!**
