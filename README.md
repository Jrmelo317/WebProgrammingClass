# CineTrack

Uma lista pessoal de filmes feita com HTML, CSS e JavaScript.

## Autor

- Nome: Joao Ricardo de Melo
- RA: 138558

## Como executar

Abra `parte1/index.html` em um navegador moderno. O projeto não precisa de servidor nem de instalação.

Use **+ Adicionar** para cadastrar um filme. Em cada card, você pode editar ou excluir o filme; a exclusão pede confirmação. Os botões acima da lista filtram por status, e o campo de busca filtra por título. Busca e status funcionam juntos. A URL do pôster é opcional.

Os filmes ficam salvos no `localStorage` do navegador, na chave `cinetrack:filmes`. Ao abrir a página pela primeira vez, aparecem seis filmes de exemplo. Os dados ficam apenas nesse navegador; limpar os dados do site apaga as alterações.

## Acessibilidade

Os botões de filtro informam qual está ativo. O formulário pode ser fechado com **Escape** e devolve o foco ao botão usado para abri-lo.
