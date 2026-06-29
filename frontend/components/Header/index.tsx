import Link from "next/link";
import { logout } from "@/app/(auth)/logout/actions";

export default function Header() {
    return (
        <header className="navbar-custom">
            <div>
                <Link href="/home" style={{ fontSize: "1.25rem" }}>Sistema de Orçamentos</Link>
            </div>
            <nav style={{ display: "flex", gap: "1rem" }}>
                <Link href="/produtos">Produtos</Link>
                <Link href="/clientes">Clientes</Link>
                <Link href="/orcamentos">Orçamentos</Link>
                <Link href="/usuario">Usuário</Link>
                <form action={logout}>
                    <button type="submit" className="btn btn-link nav-link" style={{ padding: 0, fontWeight: 500, color: 'white' }}>
                        Sair
                    </button>
                </form>
            </nav>
        </header>
    )
}