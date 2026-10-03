import { NextResponse } from 'next/server';
import { getOccurrence } from '@/lib/store';
export const runtime = 'nodejs';
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const item = await getOccurrence(id);
  return item ? NextResponse.json(item) : NextResponse.json({ error: 'Ocorrência não encontrada.' }, { status: 404 });
}
