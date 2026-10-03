import { NextResponse } from 'next/server';
import { addSupport } from '@/lib/store';
export const runtime = 'nodejs';
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const body = await request.json().catch(() => null);
  if (!body || typeof body.identificadorUsuario !== 'string' || !body.identificadorUsuario.trim()) return NextResponse.json({ error: 'Informe um identificador para registrar o apoio.' }, { status: 400 });
  try { const result = await addSupport(id, body.identificadorUsuario.trim()); return result ? NextResponse.json(result, { status: 201 }) : NextResponse.json({ error: 'Ocorrência não encontrada.' }, { status: 404 }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Não foi possível registrar.' }, { status: 409 }); }
}
