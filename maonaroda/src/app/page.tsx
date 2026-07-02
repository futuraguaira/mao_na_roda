import Link from "next/link";

const featuredServices = [
  { name: "Eletricista", description: "Instalações e manutenções rápidas" },
  { name: "Diarista", description: "Limpeza e organização para sua rotina" },
  { name: "Pedreiro", description: "Reformas e pequenos reparos" },
];

const steps = [
  "Cadastre seu perfil em poucos minutos",
  "Defina sua localização e faixa de atendimento",
  "Receba contatos por WhatsApp sem intermediários",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_45%),linear-gradient(135deg,_#fffdf7_0%,_#f8fafc_100%)] px-6 py-16 text-slate-900 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="grid items-center gap-10 rounded-3xl border border-amber-200 bg-white/80 p-8 shadow-xl shadow-amber-100 backdrop-blur sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:p-14">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
              Conectando pessoas e serviços com confiança
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Encontre ajuda perto de você, sem complicação.
              </h1>
              <p className="max-w-2xl text-lg text-slate-600">
                O Mão na Roda reúne prestadores autônomos e tomadores de serviço em um canal simples, com busca por localização, disponibilidade e contato direto por WhatsApp.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/buscar"
                className="rounded-full bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
              >
                Buscar prestadores
              </Link>
              <Link
                href="/cadastro-prestador"
                className="rounded-full border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Cadastrar perfil
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-lg">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Como funciona</p>
            <ul className="mt-5 space-y-4 text-sm text-slate-200">
              {steps.map((step) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-semibold text-slate-950">
                    ✓
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="servicos" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">Para prestadores</p>
            <h2 className="mt-3 text-2xl font-semibold">Mostre seus serviços e receba contatos qualificados</h2>
            <p className="mt-3 text-slate-600">
              Cadastre sua rotina, defina o raio de atendimento e apareça para quem precisa de ajuda perto de você.
            </p>
            <Link href="/cadastro-prestador" className="mt-5 inline-flex rounded-full bg-amber-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-amber-300">
              Quero me cadastrar
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">Serviços em destaque</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {featuredServices.map((service) => (
                <div key={service.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="font-semibold text-slate-900">{service.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
