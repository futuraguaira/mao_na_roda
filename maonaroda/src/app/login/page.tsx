"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/firebase-auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");

    try {
      if (mode === "signup") {
        await signUp(email, password);
        setMessage("Conta criada com sucesso.");
      } else {
        await signIn(email, password);
        setMessage("Login realizado com sucesso.");
      }
    } catch {
      setMessage("Não foi possível concluir a autenticação.");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-xl border border-border bg-white p-8 shadow-sm sm:p-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-sm font-medium text-brand">
            Autenticação
          </span>
          <h1 className="font-display mt-4 text-2xl font-bold text-foreground sm:text-3xl">
            {mode === "login" ? "Acesse sua conta" : "Criar conta"}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {mode === "login"
              ? "Entre para continuar usando o Mão na Roda."
              : "Cadastre-se para começar a usar."}
          </p>
        </div>

        <div className="mt-6 flex gap-2 rounded-lg border border-border bg-background p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
              mode === "login" ? "bg-white text-foreground shadow-sm" : "text-muted hover:text-foreground"
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
              mode === "signup" ? "bg-white text-foreground shadow-sm" : "text-muted hover:text-foreground"
            }`}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/10"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/10"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-brand px-5 py-3 font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark active:scale-[0.98]"
          >
            {mode === "login" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        {message ? (
          <div className="mt-4 rounded-lg border border-brand/20 bg-brand/5 p-3 text-center text-sm text-brand">
            {message}
          </div>
        ) : null}
      </div>
    </div>
  );
}
