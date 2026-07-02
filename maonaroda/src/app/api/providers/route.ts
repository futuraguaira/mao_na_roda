import { NextResponse } from "next/server";
import { createProvider, getProviders } from "@/lib/firebase-service";

export async function GET() {
  try {
    const providers = await getProviders();
    return NextResponse.json(providers);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar prestadores" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.name || !body?.phone || !body?.email || !body?.address || body?.acceptedTerms !== true) {
      return NextResponse.json({ error: "Dados obrigatórios ausentes ou termos não aceitos" }, { status: 400 });
    }

    const provider = await createProvider(body);
    return NextResponse.json(provider, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao salvar prestador" }, { status: 500 });
  }
}
