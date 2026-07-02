import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-white px-6 pt-20 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent-dark">
                🎉 100% gratuito — sem taxa, sem mensalidade
              </span>
              <h1 className="font-display text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                O prestador certo pra você,
                <br />
                <span className="text-brand">a um clique de distância.</span>
              </h1>
              <p className="max-w-xl text-lg text-muted leading-relaxed">
                Encontre eletricistas, diaristas, pedreiros e muito mais perto da sua casa. Ou cadastre seus serviços e receba clientes novos <strong className="text-foreground">todo dia — de graça</strong>.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-4 font-bold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/30 active:scale-[0.98] text-base"
                >
                  Quero contratar — é grátis
                  <span aria-hidden="true" className="text-lg">→</span>
                </Link>
                <Link
                  href="/cadastro-prestador"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-brand bg-white px-7 py-4 font-bold text-brand transition-all hover:bg-brand hover:text-white active:scale-[0.98] text-base"
                >
                  Quero oferecer serviços — também grátis
                </Link>
              </div>
              <p className="text-sm text-muted flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/10 text-xs text-brand">✓</span>
                Cadastro rápido · Sem entrevista · Zero taxas
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand/10 via-accent/5 to-transparent blur-2xl" />
              <div className="relative rounded-2xl border border-border bg-white p-8 shadow-xl shadow-brand/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex -space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-brand/10 text-sm font-semibold text-brand">A</div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-accent/10 text-sm font-semibold text-accent-dark">C</div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-brand-dark/10 text-sm font-semibold text-brand-dark">M</div>
                  </div>
                  <p className="text-sm text-muted">+120 prestadores já cadastrados</p>
                </div>
                <p className="font-display text-sm font-semibold uppercase tracking-widest text-accent">Como funciona — de graça</p>
                <div className="mt-5 space-y-5">
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/5 text-lg">📝</span>
                    <div>
                      <p className="font-semibold text-foreground"><span className="text-brand">01.</span> Cadastre-se grátis</p>
                      <p className="text-sm text-muted">Prestador ou tomador — o cadastro é livre e não custa nada.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/5 text-lg">🔍</span>
                    <div>
                      <p className="font-semibold text-foreground"><span className="text-brand">02.</span> Encontre ou seja encontrado</p>
                      <p className="text-sm text-muted">Filtre por serviço, distância e disponibilidade em tempo real.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/5 text-lg">💬</span>
                    <div>
                      <p className="font-semibold text-foreground"><span className="text-brand">03.</span> Conecte direto no WhatsApp</p>
                      <p className="text-sm text-muted">Sem intermediários, sem taxas por contato. Você combina direto.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-white p-8 relative">
              <span className="absolute -top-3 -right-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white shadow-lg">
                GRÁTIS
              </span>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent-dark">Para prestadores</p>
              <h2 className="font-display mt-3 text-2xl font-bold text-foreground">Mostre seu trabalho e receba clientes novos</h2>
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs text-brand">✓</span>
                  Cadastro 100% gratuito, sem mensalidade
                </li>
                <li className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs text-brand">✓</span>
                  Apareça para clientes perto de você
                </li>
                <li className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs text-brand">✓</span>
                  Zero taxa por contato ou serviço fechado
                </li>
                <li className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs text-brand">✓</span>
                  Você define seu raio, horário e serviços
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/cadastro-prestador" className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-bold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-dark active:scale-[0.98]">
                  Cadastrar grátis →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-brand/20 bg-gradient-to-br from-brand/5 to-white p-8 relative">
              <span className="absolute -top-3 -right-3 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white shadow-lg">
                GRÁTIS
              </span>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">Para tomadores</p>
              <h2 className="font-display mt-3 text-2xl font-bold text-foreground">Encontre ajuda perto de você, sem taxas</h2>
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs text-brand">✓</span>
                  Busque serviços perto da sua localização
                </li>
                <li className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs text-brand">✓</span>
                  Veja disponibilidade em tempo real
                </li>
                <li className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs text-brand">✓</span>
                  Contato direto por WhatsApp, sem intermediário
                </li>
                <li className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs text-brand">✓</span>
                  Avaliações reais de outros usuários
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-bold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark active:scale-[0.98]">
                  Buscar prestadores →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-gradient-to-b from-background to-white px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-sm font-medium text-brand">
            💰 100% gratuito
          </span>
          <h2 className="font-display mt-6 text-3xl font-bold text-foreground sm:text-4xl">
            Sem taxas. Sem mensalidades.{" "}
            <span className="text-accent">Sem surpresas.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted text-lg leading-relaxed">
            O Mão na Roda foi criado para conectar pessoas da sua comunidade. Diferente de outras plataformas, 
            <strong className="text-foreground"> não cobramos nada</strong> — nem de quem contrata, nem de quem oferece serviço. 
            O combinado é entre vocês.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-4 font-bold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-dark active:scale-[0.98]">
              Quero contratar — entre grátis
            </Link>
            <Link href="/cadastro-prestador" className="inline-flex items-center gap-2 rounded-xl border-2 border-brand bg-white px-7 py-4 font-bold text-brand transition-all hover:bg-brand hover:text-white active:scale-[0.98]">
              Quero oferecer serviços — cadastre grátis
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-white px-6 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
          <p>© 2026 Mão na Roda. Conectando pessoas e serviços.</p>
          <p className="flex items-center gap-1">
            Feito para sua comunidade — <span className="text-accent font-semibold">sempre gratuito</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
