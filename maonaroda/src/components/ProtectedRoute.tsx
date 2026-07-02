"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="p-8 text-center text-slate-600">Carregando sessão...</p>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Acesso restrito</h2>
        <p className="mt-3 text-slate-600">Faça login para acessar esta área do MVP.</p>
        <Link href="/login" className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-3 font-semibold text-white">
          Ir para login
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
