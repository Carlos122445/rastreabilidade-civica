# Casos de teste do MVP

| ID | Fluxo | Passos | Resultado esperado |
|---|---|---|---|
| CT-01 | Listagem | Abrir a página inicial | Ocorrências de exemplo aparecem com categoria, bairro, data, status e apoios. |
| CT-02 | Busca e filtro | Buscar por “Marco”; selecionar “Em Análise” | Lista mostra somente itens correspondentes; limpar os filtros restaura a lista. |
| CT-03 | Cadastro | Registrar título, descrição, categoria, bairro e logradouro válidos | Item é criado como Aberta e abre seus detalhes; histórico contém evento inicial. |
| CT-04 | Validação | Tentar enviar cadastro com campo obrigatório vazio | Navegador impede o envio ou API retorna erro; nenhum item inválido é criado. |
| CT-05 | Detalhes | Abrir uma ocorrência na lista | Descrição, localização, status, contagem de apoios e histórico ficam visíveis. |
| CT-06 | Apoio | Apoiar ocorrência ainda não apoiada | Contagem aumenta e o botão indica apoio registrado. |
| CT-07 | Apoio repetido | Tentar apoiar novamente com o mesmo navegador | Apoio não duplica; mensagem explica que o identificador já apoiou. |
| CT-08 | Alteração de status | Mudar status e preencher observação | Status atualiza e evento com status anterior, novo status, horário e observação aparece no histórico. |
| CT-09 | Persistência | Atualizar a página após cadastro ou apoio | Alterações permanecem no armazenamento local da aplicação. |
| CT-10 | Identificador inexistente | Consultar ID que não existe pela API | API responde 404 com mensagem de ocorrência não encontrada. |

Os dois relatos iniciais são fictícios, apenas para demonstração. Apoios e status são registros do protótipo, não evidências de atendimento oficial.

## Resultado da execução manual

Executado em 02/10/2026 com `npm install`, `npm run dev` e servidor local em `http://127.0.0.1:3000/`. Os dez casos passaram. CT-01, CT-02, CT-03, CT-04, CT-05, CT-06 e CT-08 foram observados pela interface; CT-04, CT-05, CT-07, CT-08, CT-09 e CT-10 também foram conferidos pela API. No CT-09, os dados continuaram disponíveis após novas consultas ao servidor.

| ID | Resultado observado |
|---|---|
| CT-01 | Passou: listagem renderizou três ocorrências presentes na base local. |
| CT-02 | Passou: busca por “Marco” retornou um item; filtro “Em Análise” retornou dois. |
| CT-03 | Passou: cadastro pela interface criou item Aberta e abriu os detalhes com evento inicial. |
| CT-04 | Passou: formulário vazio foi bloqueado pelo navegador; API também rejeitou campos ausentes com HTTP 400. |
| CT-05 | Passou: tela de detalhes e consulta por ID retornaram os dados da ocorrência. |
| CT-06 | Passou: apoio pela interface aumentou a contagem e desabilitou o botão para aquele navegador. |
| CT-07 | Passou: segundo apoio com o mesmo identificador foi recusado pela API com HTTP 409. |
| CT-08 | Passou: status e observação foram registrados; nova consulta mostrou evento anterior/novo no histórico. |
| CT-09 | Passou: ocorrência, apoio e histórico permaneceram legíveis em consultas posteriores. |
| CT-10 | Passou: ID inexistente retornou HTTP 404. |

Durante a verificação, duas instâncias simultâneas tentaram gravar o mesmo JSON e uma leitura pegou a gravação no meio. A gravação foi alterada para escrever em arquivo temporário e substituir o JSON ao final; a rodada final foi repetida com uma única instância e passou. A limitação de concorrência entre várias instâncias permanece documentada para o armazenamento JSON.
