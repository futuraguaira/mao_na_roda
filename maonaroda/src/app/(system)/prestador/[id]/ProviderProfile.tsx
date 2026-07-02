"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProviders } from "@/lib/firebase-service";
import type { ProviderRecord } from "@/lib/firebase-service";

export default function ProviderProfile() {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<ProviderRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProviders()
      .then((data) => {
        const found = data.find((p) => p.id === id);
        setProvider(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center text-muted">
        Carregando perfil...
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-4 text-center">
        <p className="text-4xl">🔍</p>
        <p className="font-semibold text-foreground">Prestador não encontrado</p>
        <Link href="/buscar" className="text-sm text-brand underline underline-offset-2">
          ← Voltar para busca
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand/10 text-2xl font-bold text-brand">
                  {provider.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="font-display text-2xl font-bold text-foreground">{provider.name}</h1>
                  <p className="text-brand font-medium">{provider.services?.[0] || provider.service || ""}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <p className="font-display text-lg font-bold text-foreground">Sobre o profissional</p>
              <p className="mt-3 text-sm text-muted">
                <span className="text-foreground/40">📍</span>{" "}
                {[provider.street, provider.streetNumber].filter(Boolean).join(", ")}
                {provider.neighborhood ? ` — ${provider.neighborhood}` : ""}
                {`, ${provider.city}/${provider.state}`}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(provider.services || []).map((service) => (
                  <span key={service} className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-foreground p-6 text-white shadow-sm">
              <p className="font-display text-lg font-bold">Entrar em contato</p>
              <p className="mt-2 text-sm text-white/60">
                Você pode falar diretamente com o prestador pelo WhatsApp.
              </p>
              <div className="mt-4 space-y-2 text-sm text-white/70">
                <p><span className="text-white/40">📍</span> Até {provider.radius} km</p>
                <p><span className="text-white/40">🗓️</span> {provider.availability}</p>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={`https://wa.me/${provider.phone}?text=Olá%20${encodeURIComponent(provider.name)}!%20Vi%20seu%20perfil%20no%20Mão%20na%20Roda.`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-dark active:scale-[0.98]"
                >
                  💬 Chamar no WhatsApp
                </a>
                <Link
                  href="/avaliacao"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Avaliar atendimento
                </Link>
              </div>
            </div>

            <Link
              href="/buscar"
              className="flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-5 py-3 text-sm font-medium text-muted transition-colors hover:border-brand/20 hover:text-foreground"
            >
              ← Voltar para busca
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
