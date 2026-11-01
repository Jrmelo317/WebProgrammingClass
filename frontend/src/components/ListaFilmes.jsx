function ListaFilmes({ filmes }) {
  if (filmes.length === 0) {
    return <p role="status">Nenhum filme encontrado.</p>;
  }

  return (
    <section id="lista" className="movie-cards-containers" aria-label="Lista de filmes" aria-live="polite">
      {filmes.map((filme) => (
        <CardFilme key={filme.id} filme={filme} />
      ))}
    </section>
  );
}
