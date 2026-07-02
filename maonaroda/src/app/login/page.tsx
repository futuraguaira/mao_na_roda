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
    <main className="min-h-screen bg-[linear-gradient(135deg,_#fef3c7_0%,_#f8fafc_100%)] px-6 py-16 text-slate-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-md rounded-3xl border border-amber-200 bg-white/90 p-8 shadow-xl shadow-amber-100 backdrop-blur sm:p-10">
        <span className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
          Autenticação Firebase
        </span>
        <h1 className="mt-4 text-3xl font-semibold">Acesse sua conta</h1>
        <p className="mt-3 text-slate-600">Cadastre-se ou entre para continuar usando o Mão na Roda.</p>

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${mode === "login" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${mode === "signup" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-amber-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
          >
            {mode === "login" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-slate-600">{message}</p> : null}
      </div>
    </main>
  );
}
