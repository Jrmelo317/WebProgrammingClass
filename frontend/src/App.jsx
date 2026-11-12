function App() {
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");

  const visiveis = filmesIniciais
    .filter((filme) => status === "todos" || filme.status === status)
    .filter((filme) =>
      filme.titulo.toLowerCase().includes(busca.toLowerCase())
    );

  return (
    <>
      <Header busca={busca} aoBuscar={setBusca} />
      <main className="movie-list">
        <Filtros ativo={status} aoMudar={setStatus} />
        <ListaFilmes filmes={visiveis} />
      </main>
      <footer>
        <small>CineTrack · {new Date().getFullYear()}</small>
      </footer>
    </>
  );
}
