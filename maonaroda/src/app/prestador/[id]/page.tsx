import Link from "next/link";
import { notFound } from "next/navigation";
import { providers } from "@/lib/mock-data";

export function generateStaticParams() {
  return providers.map((provider) => ({ id: String(provider.id) }));
}

export default async function PrestadorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const provider = providers.find((item) => item.id === Number(id));

  if (!provider) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,_#fef3c7_0%,_#f8fafc_100%)] px-6 py-16 text-slate-900 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border border-amber-200 bg-white/90 p-8 shadow-xl shadow-amber-100 backdrop-blur sm:p-10 lg:p-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <span className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
              Perfil do prestador
            </span>
            <h1 className="text-3xl font-semibold sm:text-4xl">{provider.name}</h1>
            <p className="max-w-2xl text-lg text-slate-600">{provider.bio}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <p>⭐ {provider.rating}</p>
            <p>📍 {provider.distance}</p>
            <p>🗓️ {provider.availability}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Sobre o profissional</h2>
            <p className="mt-3 text-slate-600">{provider.experience}</p>
            <p className="mt-3 text-slate-600">Localização: {provider.location}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {provider.services.map((service) => (
                <span key={service} className="rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white">
            <h2 className="text-xl font-semibold">Entrar em contato</h2>
            <p className="mt-3 text-sm text-slate-300">
              Você pode falar diretamente com o prestador pelo WhatsApp.
            </p>
            <a
              href={`https://wa.me/${provider.whatsapp}?text=Olá%20${encodeURIComponent(provider.name)}!%20Vi%20seu%20perfil%20no%20Mão%20na%20Roda.`}
              className="mt-6 inline-flex rounded-full bg-amber-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
            >
              Chamar no WhatsApp
            </a>
            <Link href="/avaliacao" className="mt-3 inline-flex rounded-full border border-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800">
              Avaliar atendimento
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
