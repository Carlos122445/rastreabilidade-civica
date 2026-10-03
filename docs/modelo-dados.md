# Modelo de dados

## Ocorrência

| Campo | Tipo | Regra |
|---|---|---|
| id | UUID/texto | Gerado no cadastro |
| titulo | texto | Obrigatório, até 100 caracteres |
| descricao | texto | Obrigatória, até 1.000 caracteres |
| categoria | texto | Obrigatória |
| bairro | texto | Obrigatório |
| logradouro | texto | Obrigatório; pode incluir referência aproximada |
| dataCriacao | data/hora ISO 8601 | Gerada pelo servidor |
| statusAtual | enumeração | Aberta, Em Análise, Em Execução, Resolvida ou Encerrada |

## Histórico de status

Cada item guarda `id`, `statusAnterior` (nulo no registro inicial), `novoStatus`, `dataHora` e `observacao`. Uma ocorrência nasce com status **Aberta** e um evento inicial. Alterações acrescentam eventos; a interface mostra os mais recentes primeiro.

## Apoio

Cada item guarda `id`, `identificadorUsuario` e `dataHora`. No protótipo, o identificador é anônimo e local ao navegador. Um mesmo identificador não pode apoiar duas vezes a mesma ocorrência. Apoios medem participação registrada na plataforma, não gravidade nem consenso.

## Relações para PostgreSQL/Supabase

Para migração, usar tabelas `occurrences`, `status_history` e `supports`. `status_history.occurrence_id` e `supports.occurrence_id` referenciam `occurrences.id` com exclusão em cascata. Criar índice por `occurrence_id, created_at` no histórico e restrição única em `supports(occurrence_id, user_identifier)`. O status pode ser validado por enum ou restrição `CHECK`.
