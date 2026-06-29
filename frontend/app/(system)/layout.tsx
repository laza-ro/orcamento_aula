import Link from "next/link";

/*
 * Layout da área autenticada (route group "(system)").
 *
 * Todo arquivo `page.tsx` dentro de (system) é renderizado aqui no lugar de
 * {children}. Este é o lugar para a MOLDURA do sistema: cabeçalho, menu de
 * navegação, rodapé, etc. — partes que se repetem em todas as telas internas.
 *
 * Hoje ele é só um esqueleto. PARTE DO SEU TRABALHO é construir:
 *   - um cabeçalho (Header) com o nome do sistema;
 *   - uma navegação (links para /produtos, /clientes, /orcamentos, /usuario);
 *   - um botão "Sair" que chama a server action `logout`
 *     (de "@/app/(auth)/logout/actions") dentro de um <form action={logout}>.
 *
 * Crie esses componentes em /components e importe-os aqui.
 */
export default function SystemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/*Header*/}
      <header className="navbar-custom">
        <div>
          <Link href="/home" style={{ fontSize: "1.25rem" }}>Sistema de Orçamentos</Link>
        </div>
        <nav style={{ display: "flex", gap: "1rem" }}>
          <Link href="/produtos">Produtos</Link>
          <Link href="/clientes">Clientes</Link>
          <Link href="/orcamentos">Orçamentos</Link>
          <Link href="/usuario">Usuário</Link>
        </nav>
      </header>

      <main className="container my-4" style={{ flex: 1 }}>
        {children}
      </main>

      {/*Footer*/}
      <footer className="footer-custom">
        <div>
          <p style={{ margin: 0 }}>Sistema de Orçamentos Projeto Final ADS © 2026. Todos os direitos reservados.</p>
          <p style={{ margin: 0, opacity: 0.7, fontSize: "0.9rem" }}>Desenvolvido por: Lázaro</p>
        </div>
      </footer>
    </div>
  );
}
