"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getProviders } from "@/lib/firebase-service";
import type { ProviderRecord } from "@/lib/firebase-service";

export default function BuscarPage() {
  const [service, setService] = useState("Todos");
  const [distanceFilter, setDistanceFilter] = useState("");
  const [providers, setProviders] = useState<ProviderRecord[]>([]);

  useEffect(() => {
    getProviders()
      .then((data) => setProviders(Array.isArray(data) ? data : []))
      .catch(() => setProviders([]));
  }, []);

  const serviceOptions = useMemo(() => {
    const unique = new Set<string>();
    providers.forEach((p) => {
      (p.services || []).forEach((s) => unique.add(s));
      if (p.service) unique.add(p.service);
    });
    return ["Todos", ...Array.from(unique).sort()];
  }, [providers]);

  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      const svcs = provider.services || [];
      const matchesService = service === "Todos" || svcs.includes(service) || provider.service === service;
      const matchesDistance =
        !distanceFilter || Number(provider.radius) <= Number(distanceFilter);
      return matchesService && matchesDistance;
    });
  }, [distanceFilter, providers, service]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-sm font-medium text-brand">
            <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
            Busca de prestadores
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Encontre ajuda perto de você
          </h1>
          <p className="max-w-xl text-muted">
            Filtre por serviço, distância e veja disponibilidade antes de entrar em contato.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-4 rounded-xl border border-border bg-white p-5 shadow-sm">
          <div className="min-w-[180px] flex-1">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Serviço</label>
            <select
              value={service}
              onChange={(event) => setService(event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
            >
              {serviceOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="min-w-[160px] flex-1">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Distância máxima (km)</label>
            <input
              type="number"
              min="1"
              value={distanceFilter}
              onChange={(event) => setDistanceFilter(event.target.value)}
              placeholder="Ex.: 10"
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/10"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProviders.length === 0 && (
            <div className="col-span-full rounded-xl border border-border bg-white p-12 text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-semibold text-foreground">Nenhum prestador encontrado</p>
              <p className="mt-1 text-sm text-muted">Tente ajustar os filtros para ver mais resultados.</p>
            </div>
          )}
          {filteredProviders.map((provider) => (
            <article key={provider.id} className="group rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-brand/20">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-sm font-bold text-brand">
                    {provider.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">{provider.name}</h2>
                    <p className="text-sm font-medium text-brand">{provider.services?.[0] || provider.service || ""}</p>
                  </div>
                </div>
                <span className="rounded-md bg-brand/5 px-2.5 py-1 text-xs font-semibold text-brand">
                  Novo
                </span>
              </div>

              <div className="mt-4 space-y-1.5 text-sm text-muted">
                <p className="flex items-center gap-1.5">
                  <span className="text-foreground/40">📍</span>
                  Até {provider.radius} km
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-foreground/40">🗓️</span>
                  {provider.availability}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                <Link
                  href={`/prestador/${provider.id}`}
                  className="flex-1 rounded-lg border border-border px-3 py-2 text-center text-sm font-semibold text-foreground transition-colors hover:border-brand/30 hover:bg-brand/5"
                >
                  Ver perfil
                </Link>
                <a
                  href={`https://wa.me/${provider.phone}?text=Olá%20${encodeURIComponent(provider.name)}!%20Vi%20seu%20perfil%20no%20Mão%20na%20Roda.`}
                  className="flex-1 rounded-lg bg-brand px-3 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
