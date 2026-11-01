function Filtros() {
  return (
    <nav className="button-container" aria-label="Filtrar filmes por status">
      <button type="button" className="button ativo" aria-pressed="true">Todos</button>
      <button type="button" className="button" aria-pressed="false">Assistido</button>
      <button type="button" className="button" aria-pressed="false">Assistindo</button>
      <button type="button" className="button" aria-pressed="false">Quero assistir</button>
    </nav>
  );
}
