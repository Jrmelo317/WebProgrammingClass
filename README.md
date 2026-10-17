# CineTrack

Uma lista pessoal de filmes feita com HTML, CSS e JavaScript.

## Como usar

Abra `html/index.html` no navegador. Use **+ Adicionar** para cadastrar um filme. Em cada card, você pode editar ou excluir o filme. Os botões acima da lista filtram por status, e o campo de busca filtra por título. Busca e status funcionam juntos.

Os filmes ficam salvos no `localStorage` do navegador, na chave `cinetrack:filmes`. Ao abrir a página pela primeira vez, aparecem seis filmes de exemplo. Os dados ficam apenas nesse navegador; limpar os dados do site apaga as alterações.

## Acessibilidade

Os botões de filtro informam qual está ativo. O formulário pode ser fechado com **Escape** e devolve o foco ao botão usado para abri-lo.
