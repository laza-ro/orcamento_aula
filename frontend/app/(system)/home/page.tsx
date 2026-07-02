import Link from "next/link";

export default function Home() {
	return (
		<div className="p-5 mb-4 bg-light rounded-3">
			<div className="container-fluid py-5">
				<h1 className="display-5 fw-bold mb-4">Bem-vindo(a) ao sistema de orçamentos!</h1>
				<p className="col-md-8 fs-4 mb-4">
					Utilize o menu acima para gerenciar Produtos, Clientes e Orçamentos.
				</p>
				<Link href="/orcamentos/novo" className="btn btn-primary btn-lg">
					Criar Novo Orçamento
				</Link>
			</div>
		</div>
	);
}