# Arquitetura do MVP

## Objetivo

Este protótipo acadêmico demonstra o registro e a rastreabilidade do ciclo de vida de ocorrências urbanas em Belém. Os relatos e apoios são comunitários e não representam validação oficial nem consenso da população.

## Componentes

- **Interface:** Next.js com React, TypeScript e Tailwind CSS; tela responsiva de listagem, cadastro e detalhes.
- **API:** rotas REST no próprio Next.js (`/api/ocorrencias`, `/api/ocorrencias/:id`, `PATCH /api/ocorrencias/:id/status` e `POST /api/ocorrencias/:id/apoios`).
- **Persistência de demonstração:** arquivo JSON em `data/ocorrencias.json`, criado com dois exemplos fictícios na primeira execução. O arquivo fica fora do controle de versão.
- **Identidade de apoio:** identificador anônimo gerado e mantido no navegador. Serve apenas para impedir apoio repetido no protótipo; não é autenticação.

## Execução

Requer Node.js 20.9 ou superior. Execute `npm install` e depois `npm run dev`; acesse `http://localhost:3000`. Para produção, use `npm run build` e `npm start`.

## Limites e evolução

O arquivo JSON é simples para demonstração local, mas não oferece concorrência segura, cópias de segurança, autenticação nem armazenamento compartilhado entre instâncias. Para uso multiusuário hospedado, migrar a persistência para Supabase/PostgreSQL e proteger as rotas com políticas adequadas. A interface e os contratos da API permitem essa substituição. Não há mapa, GPS, chat, integração institucional ou IA no produto.
