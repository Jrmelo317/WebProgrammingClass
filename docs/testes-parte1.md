# Testes da Parte 1 — ANP 6

Testei as funcionalidades da Parte 1 no navegador e tudo funcionou como esperado.

| Teste | O que eu esperava | O que aconteceu | Resultado |
| --- | --- | --- | --- |
| Adicionar um filme | O filme aparecer na lista sem precisar recarregar a página. | Preenchi o formulário e salvei. O card apareceu na lista e o modal fechou. | Passou |
| Ano fora da faixa | Mostrar um erro e não salvar o filme. | Tentei cadastrar um filme com ano inválido. O erro apareceu e o filme não foi salvo. | Passou |
| Editar um filme | Atualizar o filme escolhido sem criar outro card. | Alterei os dados de um filme e salvei. O card foi atualizado sem duplicar. | Passou |
| Cancelar a exclusão | Manter o filme na lista. | Cliquei em excluir e cancelei a confirmação. O filme continuou na lista. | Passou |
| Busca e filtro juntos | Mostrar somente os filmes que atendem à busca e ao status escolhido. | Fiz uma busca e troquei o filtro de status. A lista respeitou os dois critérios. | Passou |
| Recarregar a página | Manter os filmes que eu cadastrei e editei. | Recarreguei a página e os dados continuaram salvos. | Passou |
| Fechar o modal | Fechar tanto com Esc quanto com Cancelar. | Abri o formulário e testei as duas formas. O modal fechou nas duas. | Passou |
| Primeira visita | Carregar os seis filmes iniciais quando não houver dados salvos. | Limpei a chave `cinetrack:filmes` do localStorage e recarreguei. Os seis filmes iniciais apareceram. | Passou |

Não precisei fazer correções nesses casos, porque todos passaram.

## Ordenação

Também testei o campo de ordenação:

- Por título, os filmes ficaram em ordem alfabética.
- Por ano, os mais antigos apareceram primeiro.
- Por nota, os filmes com as maiores notas apareceram primeiro.
- Alterei a ordenação com a busca e o filtro de status ativos. Os dois continuaram funcionando junto com a ordenação.
