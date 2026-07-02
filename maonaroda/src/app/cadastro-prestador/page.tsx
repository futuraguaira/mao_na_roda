"use client";

import { useState, type FormEvent } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { createProvider } from "@/lib/firebase-service";

const servicesOptions = [
  "Eletricista",
  "Diarista",
  "Pedreiro",
  "Encanador",
  "Babá",
  "Designer",
];

const availabilityOptions = [
  "Manhã",
  "Tarde",
  "Noite",
  "Fim de semana",
  "Qualquer horário",
];

export default function CadastroPrestadorPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState("10");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [availability, setAvailability] = useState("Qualquer horário");
  const [notes, setNotes] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !phone.trim() || !email.trim() || !address.trim() || selectedServices.length === 0 || !acceptedTerms) {
      return;
    }

    try {
      await createProvider({
        name,
        phone,
        email,
        address,
        service: selectedServices[0],
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
      <main className="min-h-screen bg-[linear-gradient(135deg,_#fef3c7_0%,_#f8fafc_100%)] px-6 py-16 text-slate-900 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border border-amber-200 bg-white/90 p-8 shadow-xl shadow-amber-100 backdrop-blur sm:p-10 lg:p-12">
        <div className="space-y-3">
          <span className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
            Cadastro de prestador
          </span>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Mostre seu trabalho e receba contatos qualificados.
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">
            Em poucos passos, você descreve os serviços que faz, o raio de atendimento e sua disponibilidade.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="name">
                Nome completo
              </label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-0 transition focus:border-amber-400"
                placeholder="Ex.: Ana Souza"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="phone">
                Telefone / WhatsApp
              </label>
              <input
                id="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-400"
                placeholder="Ex.: 11999998888"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-400"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="address">
                Endereço
              </label>
              <input
                id="address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-400"
                placeholder="Rua, número, bairro, cidade"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="radius">
                Raio de atendimento (km)
              </label>
              <input
                id="radius"
                type="number"
                min="1"
                max="50"
                value={radius}
                onChange={(event) => setRadius(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Serviços que você oferece
              </label>
              <div className="flex flex-wrap gap-2">
                {servicesOptions.map((service) => {
                  const active = selectedServices.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                        active
                          ? "bg-slate-900 text-white"
                          : "border border-slate-300 bg-white text-slate-700 hover:border-amber-400"
                      }`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="availability">
                Disponibilidade
              </label>
              <select
                id="availability"
                value={availability}
                onChange={(event) => setAvailability(event.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none transition focus:border-amber-400"
              >
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="notes">
                Observações
              </label>
              <textarea
                id="notes"
                rows={5}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none transition focus:border-amber-400"
                placeholder="Descreva sua experiência ou especialidade."
              />
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-slate-700 bg-slate-900 p-4 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-800"
              />
              <span>
                Eu aceito o uso dos meus dados para atendimento, comunicação comercial e futuras ações de marketing, conforme a LGPD. Entendo que posso solicitar exclusão a qualquer momento.
              </span>
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-amber-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
            >
              Salvar cadastro
            </button>

            {submitted && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                Cadastro recebido! Em breve, a plataforma poderá armazenar esse perfil de forma definitiva.
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
    </ProtectedRoute>
  );
}
