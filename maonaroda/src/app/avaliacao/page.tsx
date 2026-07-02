"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const reviewOptions = [5, 4, 3, 2, 1];

export default function AvaliacaoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState(5);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[linear-gradient(135deg,_#fef3c7_0%,_#f8fafc_100%)] px-6 py-16 text-slate-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl rounded-3xl border border-amber-200 bg-white/90 p-8 shadow-xl shadow-amber-100 backdrop-blur sm:p-10">
        <span className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
          Avaliação pós-atendimento
        </span>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Como foi a experiência?</h1>
        <p className="mt-3 text-lg text-slate-600">
          Sua avaliação ajuda outros usuários a encontrar prestadores mais confiáveis.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-medium text-slate-700">Selecione sua nota</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {reviewOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelected(option)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selected === option
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 bg-white text-slate-700 hover:border-amber-400"
                }`}
              >
                {option}★
              </button>
            ))}
          </div>

          <label className="mt-6 block text-sm font-medium text-slate-700" htmlFor="comment">
            Comentário
          </label>
          <textarea
            id="comment"
            rows={4}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-amber-400"
            placeholder="Conte o que foi bom ou o que poderia melhorar."
          />

          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="mt-6 rounded-full bg-amber-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
          >
            Enviar avaliação
          </button>

          {submitted && (
            <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-700">
              Avaliação enviada com sucesso. Obrigado por ajudar a comunidade!
            </div>
          )}
        </div>
      </div>
    </main>
    </ProtectedRoute>
  );
}
