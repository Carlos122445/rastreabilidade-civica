import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Território em Foco | Belém', description: 'Acompanhe ocorrências urbanas e seu histórico em Belém do Pará.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body>{children}</body></html>; }
