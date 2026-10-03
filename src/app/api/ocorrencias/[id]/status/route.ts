import { NextResponse } from 'next/server';
import { changeStatus, STATUSES } from '@/lib/store';
export const runtime = 'nodejs';
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const body = await request.json().catch(() => null);
  if (!body || !STATUSES.includes(body.status) || (body.observacao !== undefined && typeof body.observacao !== 'string')) return NextResponse.json({ error: 'Status ou observação inválidos.' }, { status: 400 });
  try { const result = await changeStatus(id, body.status, body.observacao ?? ''); return result ? NextResponse.json(result) : NextResponse.json({ error: 'Ocorrência não encontrada.' }, { status: 404 }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Não foi possível atualizar.' }, { status: 409 }); }
}
