import Link from "next/link";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          <Link href="/" className="text-xl font-semibold text-slate-900">
            Mão na Roda
          </Link>
          <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-700">
            <Link href="/buscar" className="rounded-full px-3 py-2 hover:bg-slate-100">
              Buscar
            </Link>
            <Link href="/cadastro-prestador" className="rounded-full px-3 py-2 hover:bg-slate-100">
              Cadastrar
            </Link>
            <Link href="/avaliacao" className="rounded-full px-3 py-2 hover:bg-slate-100">
              Avaliar
            </Link>
            <Link href="/login" className="rounded-full px-3 py-2 hover:bg-slate-100">
              Entrar
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
