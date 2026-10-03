import { NextResponse } from 'next/server';
import { createOccurrence, listOccurrences } from '@/lib/store';

export const runtime = 'nodejs';
export async function GET() { return NextResponse.json(await listOccurrences()); }
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const fields = ['titulo','descricao','categoria','bairro','logradouro'] as const;
  if (!body || fields.some(field => typeof body[field] !== 'string' || !body[field].trim())) return NextResponse.json({ error: 'Preencha todos os campos.' }, { status: 400 });
  const created = await createOccurrence(Object.fromEntries(fields.map(field => [field, body[field].trim()])) as Record<typeof fields[number], string>);
  return NextResponse.json(created, { status: 201 });
}
