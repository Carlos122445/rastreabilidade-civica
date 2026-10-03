# Plataforma de Rastreabilidade Cívica Territorial

MVP acadêmico web para registrar ocorrências urbanas em Belém/PA e acompanhar seu ciclo de vida por status, apoios comunitários e histórico cronológico.

## Stack

- Next.js 15.5.27 e React 19
- TypeScript 5.9
- Tailwind CSS 4
- Persistência local em arquivo JSON para execução simples, sem serviços externos

## Requisitos

Node.js 20.9 ou superior e npm.

## Instalação e execução local

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). Na primeira execução, a aplicação cria `data/ocorrencias.json` com ocorrências fictícias para demonstração. O diretório `data/` é local e não deve ser versionado.

Para compilar e executar a versão de produção:

```bash
npm run build
npm start
```

## Funcionalidades implementadas

- Listagem de ocorrências com busca textual e filtro por status.
- Cadastro com título, descrição, categoria, bairro e logradouro.
- Detalhes da ocorrência e histórico cronológico das mudanças.
- Registro de apoio e prevenção de apoio duplicado por identificador local do navegador.
- Alteração entre Aberta, Em Análise, Em Execução, Resolvida e Encerrada, com observação opcional.
- API REST pelas rotas Next.js em `/api/ocorrencias`.

## Limitações conhecidas

- O arquivo JSON é apropriado para demonstração local e uma instância; não oferece concorrência transacional nem armazenamento compartilhado para hospedagem com múltiplas instâncias.
- O identificador usado no apoio não é autenticação e fica no navegador.
- Relatos e apoios não são verificados oficialmente.
- Não há login, Supabase, mapa/GPS, chat, integração com órgãos públicos ou IA.
- `sources/` contém documentos de referência sincronizados e dados acadêmicos locais; não faz parte do código publicado.

## Testes realizados

Os casos CT-01 a CT-10 foram exercitados manualmente pela interface e API: listagem, filtros, cadastro, validação, detalhes, apoio, bloqueio de duplicidade, alteração de status, histórico, persistência e resposta 404. O resultado detalhado está em [`docs/casos-de-teste.md`](docs/casos-de-teste.md). A instalação e a compilação de produção também foram verificadas.

## Documentação

- [Arquitetura](docs/arquitetura.md)
- [Modelo de dados](docs/modelo-dados.md)
- [Backlog](docs/backlog.md)
- [Casos de teste](docs/casos-de-teste.md)
