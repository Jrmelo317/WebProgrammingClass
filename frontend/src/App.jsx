function App() {
  const [filmes, setFilmes] = useState(filmesIniciais);
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");
  const [editando, setEditando] = useState(null);

  const visiveis = filmes
    .filter((filme) => status === "todos" || filme.status === status)
    .filter((filme) =>
      filme.titulo.toLowerCase().includes(busca.toLowerCase())
    );

  function adicionar(novoFilme) {
    setFilmes((anteriores) => [
      ...anteriores,
      { ...novoFilme, id: gerarId(anteriores) },
    ]);
  }

  function remover(id) {
    setFilmes((anteriores) => anteriores.filter((filme) => filme.id !== id));
  }

  function editar(id, alteracoes) {
    setFilmes((anteriores) => anteriores.map((filme) =>
      filme.id === id ? { ...filme, ...alteracoes } : filme
    ));
  }

  function salvar(dados) {
    if (editando.id) {
      editar(editando.id, dados);
    } else {
      adicionar(dados);
    }
    setEditando(null);
  }

  return (
    <>
      <Header
        busca={busca}
        aoBuscar={setBusca}
        aoAdicionar={() => setEditando({})}
      />
      <main className="movie-list">
        <Filtros ativo={status} aoMudar={setStatus} />
        <ListaFilmes
          filmes={visiveis}
          aoEditar={setEditando}
          aoRemover={remover}
        />
      </main>
      {editando !== null && (
        <ModalFilme
          filme={editando}
          aoSalvar={salvar}
          aoFechar={() => setEditando(null)}
        />
      )}
      <footer>
        <small>CineTrack · {new Date().getFullYear()}</small>
      </footer>
    </>
  );
}
