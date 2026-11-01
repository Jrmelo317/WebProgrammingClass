function App() {
  return (
    <>
      <Header />
      <main className="movie-list">
        <Filtros />
        <ListaFilmes filmes={filmesIniciais} />
      </main>
      <footer>
        <small>CineTrack · {new Date().getFullYear()}</small>
      </footer>
    </>
  );
}
