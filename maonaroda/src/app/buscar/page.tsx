"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { services } from "@/lib/mock-data";
import { getProviders } from "@/lib/firebase-service";
import type { ProviderRecord } from "@/lib/firebase-service";

export default function BuscarPage() {
  const [service, setService] = useState("Todos");
  const [distanceFilter, setDistanceFilter] = useState("Todos");
  const [providers, setProviders] = useState<ProviderRecord[]>([]);

  useEffect(() => {
    getProviders()
      .then((data) => setProviders(Array.isArray(data) ? data : []))
      .catch(() => setProviders([]));
  }, []);

  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      const matchesService = service === "Todos" || provider.service === service;
      const matchesDistance =
        distanceFilter === "Todos" ||
        (distanceFilter === "Até 3 km" && Number(provider.radius) <= 3) ||
        (distanceFilter === "Até 5 km" && Number(provider.radius) <= 5);
      return matchesService && matchesDistance;
    });
  }, [distanceFilter, providers, service]);

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,_#fef3c7_0%,_#f8fafc_100%)] px-6 py-16 text-slate-900 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-3xl border border-amber-200 bg-white/90 p-8 shadow-xl shadow-amber-100 backdrop-blur sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <span className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                Busca de prestadores
              </span>
              <h1 className="text-3xl font-semibold sm:text-4xl">
                Encontre ajuda perto de você em poucos segundos.
              </h1>
              <p className="max-w-2xl text-lg text-slate-600">
                Filtre por serviço, distância e veja disponibilidade antes de entrar em contato.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Serviço</label>
                <select
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-amber-400"
                >
                  {services.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Distância</label>
                <select
                  value={distanceFilter}
                  onChange={(event) => setDistanceFilter(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-amber-400"
                >
                  <option>Todos</option>
                  <option>Até 3 km</option>
                  <option>Até 5 km</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {filteredProviders.map((provider) => (
            <article key={provider.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{provider.name}</h2>
                  <p className="mt-1 text-sm font-medium text-amber-600">{provider.service}</p>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                  Novo
                </span>
              </div>

              <div className="mt-5 space-y-2 text-sm text-slate-600">
                <p>📍 Até {provider.radius} km</p>
                <p>🗓️ {provider.availability}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/prestador/${provider.id}`}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-amber-400 hover:bg-slate-50"
                >
                  Ver perfil
                </Link>
                <a
                  href={`https://wa.me/${provider.phone}?text=Olá%20${encodeURIComponent(provider.name)}!%20Vi%20seu%20perfil%20no%20Mão%20na%20Roda.`}
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Chamar no WhatsApp
                </a>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
