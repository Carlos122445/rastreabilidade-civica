# Backlog do MVP

## Entregue nesta versão

- Listar e filtrar ocorrências por texto e status.
- Cadastrar ocorrência com título, descrição, categoria, bairro e logradouro.
- Consultar detalhes e histórico cronológico.
- Apoiar uma ocorrência sem repetição pelo identificador local.
- Alterar status entre Aberta, Em Análise, Em Execução, Resolvida e Encerrada, com observação opcional.
- Persistir dados localmente para demonstração.

## Próximo passo recomendado

1. Migrar JSON para Supabase/PostgreSQL e configurar variáveis de ambiente.
2. Definir autenticação apropriada antes de publicar apoios multiusuário.
3. Validar acessibilidade, categorias e clareza com usuários em avaliação acadêmica.

## Refinamentos sugeridos nas observações da interface

- Adicionar categorias diretas para falta de energia, falta de água e danos relacionados a chuvas.
- Incluir CEP e padronizar o endereço; busca por raio depende de coordenadas e deve ser avaliada junto ao escopo de localização.
- Permitir retirar um apoio feito por engano.
- Avaliar o status “Encaminhada” entre análise e execução.
- Representar reabertura no ciclo e permitir filtrar ocorrências reabertas.

## Fora do escopo atual

Mapa/GPS, chat, integração com prefeitura, moderação complexa, permissões administrativas, classificação por IA e comprovação oficial dos relatos.
