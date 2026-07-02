"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { createProvider } from "@/lib/firebase-service";

export default function CadastroPrestadorPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [addressComplement, setAddressComplement] = useState("");
  const [radius, setRadius] = useState("10");
  const [services, setServices] = useState<string[]>([]);
  const [serviceInput, setServiceInput] = useState("");
  const [availability, setAvailability] = useState("");
  const [notes, setNotes] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const addService = () => {
    const trimmed = serviceInput.trim();
    if (trimmed && !services.includes(trimmed)) {
      setServices((current) => [...current, trimmed]);
      setServiceInput("");
    }
  };

  const removeService = (service: string) => {
    setServices((current) => current.filter((item) => item !== service));
  };

  const handleServiceKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addService();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !phone.trim() || !email.trim() || !street.trim() || !city.trim() || !state.trim() || services.length === 0 || !acceptedTerms) {
      return;
    }

    try {
      await createProvider({
        name,
        phone,
        email,
        street,
        streetNumber,
        neighborhood,
        city,
        state,
        zipCode,
        addressComplement,
        services,
        radius,
        availability,
        notes,
        acceptedTerms,
        consentDate: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-background to-white px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-sm font-medium text-brand">
              <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
              Cadastro de prestador
            </span>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Mostre seu trabalho e receba contatos
            </h1>
            <p className="max-w-2xl text-muted">
              Em poucos passos, você descreve os serviços que faz, o raio de atendimento e sua disponibilidade.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5 rounded-xl border border-border bg-white p-6 shadow-sm">
              <p className="font-display text-lg font-bold text-foreground">Dados do profissional</p>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="name">
                  Nome completo
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/10"
                  placeholder="Ex.: Ana Souza"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="phone">
                    Telefone / WhatsApp
                  </label>
                  <input
                    id="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/10"
                    placeholder="Ex.: 11999998888"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/10"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <p className="mb-1.5 block text-sm font-medium text-foreground">
                  Serviços que você oferece
                </p>
                <div className="flex gap-2">
                  <input
                    value={serviceInput}
                    onChange={(event) => setServiceInput(event.target.value)}
                    onKeyDown={handleServiceKeyDown}
                    className="flex-1 rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/10"
                    placeholder="Digite um serviço e pressione Enter"
                  />
                  <button
                    type="button"
                    onClick={addService}
                    className="rounded-lg border border-brand bg-brand/5 px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand/10"
                  >
                    + Adicionar
                  </button>
                </div>
                {services.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {services.map((service) => (
                      <span
                        key={service}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-brand/10 px-3 py-1.5 text-sm font-medium text-brand"
                      >
                        {service}
                        <button
                          type="button"
                          onClick={() => removeService(service)}
                          className="inline-flex h-4 w-4 items-center justify-center rounded-full text-xs font-bold text-brand/60 hover:bg-brand/20 hover:text-brand"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-foreground">Endereço</p>
                <div className="space-y-3">
                  <div className="grid grid-cols-[1fr_100px] gap-3">
                    <div>
                      <label className="mb-1 block text-xs text-muted" htmlFor="street">
                        Rua / Av.
                      </label>
                      <input
                        id="street"
                        value={street}
                        onChange={(event) => setStreet(event.target.value)}
                        required
                        className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/10"
                        placeholder="Rua das Flores"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-muted" htmlFor="streetNumber">
                        Nº
                      </label>
                      <input
                        id="streetNumber"
                        value={streetNumber}
                        onChange={(event) => setStreetNumber(event.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/10"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs text-muted" htmlFor="neighborhood">
                        Bairro
                      </label>
                      <input
                        id="neighborhood"
                        value={neighborhood}
                        onChange={(event) => setNeighborhood(event.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/10"
                        placeholder="Centro"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-muted" htmlFor="city">
                        Cidade
                      </label>
                      <input
                        id="city"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        required
                        className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/10"
                        placeholder="São Paulo"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-3">
                    <div>
                      <label className="mb-1 block text-xs text-muted" htmlFor="state">
                        UF
                      </label>
                      <input
                        id="state"
                        value={state}
                        onChange={(event) => setState(event.target.value)}
                        required
                        className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/10"
                        placeholder="SP"
                        maxLength={2}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-muted" htmlFor="zipCode">
                        CEP
                      </label>
                      <input
                        id="zipCode"
                        value={zipCode}
                        onChange={(event) => setZipCode(event.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/10"
                        placeholder="01305-000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted" htmlFor="addressComplement">
                      Complemento
                    </label>
                    <input
                      id="addressComplement"
                      value={addressComplement}
                      onChange={(event) => setAddressComplement(event.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/10"
                      placeholder="Apto, bloco, etc. (opcional)"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="radius">
                  Raio de atendimento (km)
                </label>
                <input
                  id="radius"
                  type="number"
                  min="1"
                  max="50"
                  value={radius}
                  onChange={(event) => setRadius(event.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                />
              </div>
            </div>

            <div className="space-y-5 rounded-xl border border-border bg-foreground p-6 text-white shadow-sm">
              <p className="font-display text-lg font-bold">Disponibilidade e detalhes</p>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/70" htmlFor="availability">
                  Disponibilidade
                </label>
                <input
                  id="availability"
                  value={availability}
                  onChange={(event) => setAvailability(event.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="Ex.: Seg a sex, 08h-18h"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/70" htmlFor="notes">
                  Observações
                </label>
                <textarea
                  id="notes"
                  rows={5}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="Descreva sua experiência ou especialidade."
                />
              </div>

              <label className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-white/20 bg-transparent accent-accent"
                />
                <span>
                  Aceito o uso dos meus dados para atendimento e comunicação, conforme a LGPD.
                </span>
              </label>

              <button
                type="submit"
                className="w-full rounded-lg bg-accent px-5 py-3 font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-dark active:scale-[0.98]"
              >
                Salvar cadastro
              </button>

              {submitted && (
                <div className="rounded-lg border border-accent/30 bg-accent/10 p-4 text-sm text-accent-light">
                  Cadastro recebido! Em breve, seu perfil estará disponível na plataforma.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
