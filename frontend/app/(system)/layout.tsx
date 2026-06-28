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
    <div>
      {/*Header*/}
      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link href="/home" className="navbar-brand">Sistema de Orçamentos</Link>
          <nav>
            {/*Links de navegacao*/}
            <Link href="/produtos" className="nav-link">Produtos</Link>
            <Link href="/clientes" className="nav-link">Clientes</Link>
            <Link href="/orcamentos" className="nav-link">Orçamentos</Link>
            <Link href="/usuario" className="nav-link">Usuário</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      {/* TODO: <Footer /> aqui */}

      <footer className="footer py-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="text-muted">Sistema de Orçamentos Projeto Final ADS © 2026. Todos os direitos reservados.</p>
            </div>
            <div className="col-md-6 text-end">
              <p className="text-muted">Desenvolvido por: Lázaro</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
