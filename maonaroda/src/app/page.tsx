import Link from "next/link";

const featuredServices = [
  { name: "Eletricista", description: "Instalações e reparos", icon: "⚡" },
  { name: "Diarista", description: "Limpeza e organização", icon: "🧹" },
  { name: "Pedreiro", description: "Reformas e reparos", icon: "🔨" },
];

const steps = [
  { icon: "📝", title: "Cadastre", desc: "Seu perfil em poucos minutos, gratuito" },
  { icon: "📍", title: "Defina", desc: "Localização e raio de atendimento" },
  { icon: "💬", title: "Conecte", desc: "Contato direto por WhatsApp, sem taxas" },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-white px-6 pt-20 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-sm font-medium text-brand">
                <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
                Conectando pessoas com confiança
              </span>
              <h1 className="font-display text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                Encontre ajuda perto de você,
                <br />
                <span className="text-brand">sem complicação.</span>
              </h1>
              <p className="max-w-xl text-lg text-muted leading-relaxed">
                O Mão na Roda reúne prestadores autônomos e tomadores de serviço em um canal simples, com busca por localização e contato direto por WhatsApp.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/buscar"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/30 active:scale-[0.98]"
                >
                  Buscar prestadores
                  <span aria-hidden="true" className="text-lg">→</span>
                </Link>
                <Link
                  href="/cadastro-prestador"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-white px-6 py-3.5 font-semibold text-foreground transition-all hover:border-brand/30 hover:bg-brand/5 active:scale-[0.98]"
                >
                  Quero oferecer serviços
                </Link>
              </div>
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
                  <p className="text-sm text-muted">+120 prestadores ativos</p>
                </div>
                <p className="font-display text-sm font-semibold uppercase tracking-widest text-accent">Como funciona</p>
                <div className="mt-5 space-y-5">
                  {steps.map((step, i) => (
                    <div key={step.title} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/5 text-lg">
                        {step.icon}
                      </span>
                      <div>
                        <p className="font-semibold text-foreground">
                          <span className="text-brand">{String(i + 1).padStart(2, "0")}.</span> {step.title}
                        </p>
                        <p className="text-sm text-muted">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-border bg-background p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">Para prestadores</p>
              <h2 className="font-display mt-3 text-2xl font-bold text-foreground">Mostre seus serviços e receba contatos</h2>
              <p className="mt-3 text-muted leading-relaxed">
                Cadastre sua rotina, defina o raio de atendimento e apareça para quem precisa de ajuda perto de você. Sem mensalidades, sem taxas por contato.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/cadastro-prestador" className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-dark">
                  Quero me cadastrar
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">Serviços em destaque</p>
              <div className="mt-6 grid gap-4">
                {featuredServices.map((service) => (
                  <div key={service.name} className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-colors hover:border-brand/20">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                      {service.icon}
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">{service.name}</h3>
                      <p className="text-sm text-muted">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-t from-background to-white px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">Pronto para começar?</p>
          <h2 className="font-display mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Junte-se ao Mão na Roda
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Milhares de prestadores já estão conectando com novos clientes. Cadastre-se gratuitamente e comece hoje.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/cadastro-prestador" className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-dark active:scale-[0.98]">
              Cadastrar perfil
            </Link>
            <Link href="/buscar" className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-white px-6 py-3.5 font-semibold text-foreground transition-all hover:border-brand/30 hover:bg-brand/5 active:scale-[0.98]">
              Buscar prestadores
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-white px-6 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
          <p>© 2026 Mão na Roda. Feito com dedicação.</p>
          <p className="flex items-center gap-1">
            Conectando pessoas e serviços com <span className="text-accent">confiança</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
