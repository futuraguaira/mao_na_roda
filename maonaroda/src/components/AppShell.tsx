import Link from "next/link";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-foreground">
      <header className="border-b border-border bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white text-sm font-bold">
              M
            </span>
            Mão na Roda
          </Link>
          <nav className="flex items-center gap-1 text-sm font-medium text-muted">
            <Link href="/buscar" className="rounded-lg px-3 py-2 transition-colors hover:bg-brand/10 hover:text-brand">
              Buscar
            </Link>
            <Link href="/cadastro-prestador" className="rounded-lg px-3 py-2 transition-colors hover:bg-brand/10 hover:text-brand">
              Cadastrar
            </Link>
            <Link href="/avaliacao" className="rounded-lg px-3 py-2 transition-colors hover:bg-brand/10 hover:text-brand">
              Avaliar
            </Link>
            <Link href="/login" className="ml-2 rounded-lg bg-accent px-4 py-2 font-semibold text-white transition-colors hover:bg-accent-dark">
              Entrar
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
