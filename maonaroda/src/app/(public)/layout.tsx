import Link from "next/link";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-foreground">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Mão na Roda" className="h-32 w-auto" />
          </Link>
          <nav className="flex items-center gap-1 text-sm font-medium text-muted">
            <Link href="/login" className="rounded-lg bg-accent px-4 py-2 font-semibold text-white transition-colors hover:bg-accent-dark">
              Entrar
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
