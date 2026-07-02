"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const reviewOptions = [5, 4, 3, 2, 1];

const labels: Record<number, string> = {
  5: "Excelente",
  4: "Bom",
  3: "Regular",
  2: "Ruim",
  1: "Péssimo",
};

export default function AvaliacaoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState(0);

  return (
    <ProtectedRoute>
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg rounded-xl border border-border bg-white p-8 shadow-sm sm:p-10">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-sm font-medium text-brand">
              Avaliação
            </span>
            <h1 className="font-display mt-4 text-2xl font-bold text-foreground sm:text-3xl">
              Como foi a experiência?
            </h1>
            <p className="mt-2 text-sm text-muted">
              Sua avaliação ajuda outros usuários a encontrar prestadores mais confiáveis.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-border bg-background p-6">
              <p className="text-sm font-semibold text-foreground">Selecione sua nota</p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {reviewOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelected(option)}
                    className={`flex h-14 w-14 items-center justify-center rounded-xl text-lg font-bold transition-all ${
                      selected === option
                        ? "bg-brand text-white shadow-md shadow-brand/20 scale-110"
                        : "border border-border bg-white text-muted hover:border-brand/30 hover:text-brand hover:bg-brand/5"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {selected > 0 && (
                <p className="mt-3 text-center text-sm font-medium text-brand">
                  {labels[selected]}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="comment">
                Comentário <span className="text-muted">(opcional)</span>
              </label>
              <textarea
                id="comment"
                rows={4}
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/10"
                placeholder="Conte o que foi bom ou o que poderia melhorar."
              />
            </div>

            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="w-full rounded-lg bg-brand px-5 py-3 font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark active:scale-[0.98]"
            >
              Enviar avaliação
            </button>

            {submitted && (
              <div className="rounded-lg border border-brand/20 bg-brand/5 p-4 text-center text-sm text-brand">
                Avaliação enviada com sucesso. Obrigado por ajudar a comunidade!
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
