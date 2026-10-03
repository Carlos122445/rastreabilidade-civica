import { promises as fs } from 'node:fs';
import path from 'node:path';

export const STATUSES = ['Aberta', 'Em Análise', 'Em Execução', 'Resolvida', 'Encerrada'] as const;
export type Status = typeof STATUSES[number];
export type History = { id: string; statusAnterior: Status | null; novoStatus: Status; dataHora: string; observacao: string };
export type Support = { id: string; identificadorUsuario: string; dataHora: string };
export type Occurrence = { id: string; titulo: string; descricao: string; categoria: string; bairro: string; logradouro: string; dataCriacao: string; statusAtual: Status; historico: History[]; apoios: Support[] };
const dataFile = path.join(process.cwd(), 'data', 'ocorrencias.json');
const initial: Occurrence[] = [
  { id: 'oc-001', titulo: 'Buraco na via próximo à praça', descricao: 'Há um buraco grande na pista, dificultando a passagem de carros e bicicletas.', categoria: 'Vias e calçadas', bairro: 'Marco', logradouro: 'Av. Duque de Caxias, próximo à Praça do Operário', dataCriacao: '2026-09-25T12:00:00.000Z', statusAtual: 'Em Análise', historico: [{ id: 'hist-001', statusAnterior: null, novoStatus: 'Aberta', dataHora: '2026-09-25T12:00:00.000Z', observacao: 'Ocorrência registrada.' }, { id: 'hist-002', statusAnterior: 'Aberta', novoStatus: 'Em Análise', dataHora: '2026-09-27T15:30:00.000Z', observacao: 'Relato encaminhado para análise comunitária.' }], apoios: [{ id: 'apo-001', identificadorUsuario: 'morador-01', dataHora: '2026-09-26T12:00:00.000Z' }] },
  { id: 'oc-002', titulo: 'Lâmpada apagada em poste', descricao: 'O poste permanece apagado durante a noite no trecho informado.', categoria: 'Iluminação pública', bairro: 'Guamá', logradouro: 'Rua Barão de Igarapé Miri, próximo à passagem São Pedro', dataCriacao: '2026-09-28T12:00:00.000Z', statusAtual: 'Aberta', historico: [{ id: 'hist-003', statusAnterior: null, novoStatus: 'Aberta', dataHora: '2026-09-28T12:00:00.000Z', observacao: 'Ocorrência registrada.' }], apoios: [] },
];

async function read(): Promise<Occurrence[]> {
  try { return JSON.parse(await fs.readFile(dataFile, 'utf8')) as Occurrence[]; }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify(initial, null, 2), 'utf8');
    return initial;
  }
}
async function write(rows: Occurrence[]) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  const temporaryFile = `${dataFile}.${process.pid}.${crypto.randomUUID()}.tmp`;
  try {
    await fs.writeFile(temporaryFile, JSON.stringify(rows, null, 2), 'utf8');
    await fs.rename(temporaryFile, dataFile);
  } catch (error) {
    await fs.rm(temporaryFile, { force: true }).catch(() => undefined);
    throw error;
  }
}
export async function listOccurrences() { return (await read()).sort((a,b) => b.dataCriacao.localeCompare(a.dataCriacao)); }
export async function getOccurrence(id: string) { return (await read()).find(row => row.id === id) ?? null; }
export async function createOccurrence(input: Omit<Occurrence, 'id'|'dataCriacao'|'statusAtual'|'historico'|'apoios'>) {
  const rows = await read(); const now = new Date().toISOString();
  const created: Occurrence = { ...input, id: crypto.randomUUID(), dataCriacao: now, statusAtual: 'Aberta', apoios: [], historico: [{ id: crypto.randomUUID(), statusAnterior: null, novoStatus: 'Aberta', dataHora: now, observacao: 'Ocorrência registrada.' }] };
  rows.push(created); await write(rows); return created;
}
export async function changeStatus(id: string, status: Status, observacao: string) {
  const rows = await read(); const row = rows.find(item => item.id === id); if (!row) return null;
  if (row.statusAtual === status) throw new Error('A ocorrência já está neste status.');
  const now = new Date().toISOString();
  row.historico.push({ id: crypto.randomUUID(), statusAnterior: row.statusAtual, novoStatus: status, dataHora: now, observacao: observacao.trim() || `Status alterado para ${status}.` });
  row.statusAtual = status; await write(rows); return row;
}
export async function addSupport(id: string, identificadorUsuario: string) {
  const rows = await read(); const row = rows.find(item => item.id === id); if (!row) return null;
  if (row.apoios.some(item => item.identificadorUsuario === identificadorUsuario)) throw new Error('Este identificador já apoiou a ocorrência.');
  row.apoios.push({ id: crypto.randomUUID(), identificadorUsuario, dataHora: new Date().toISOString() }); await write(rows); return row;
}
