function Header({ busca, aoBuscar }) {
  return (
    <header className="header-content">
      <h1 className="title">CineTrack</h1>
      <input
        type="search"
        className="input-text-film"
        placeholder="Buscar filme..."
        aria-label="Buscar filme"
        value={busca}
        onChange={(e) => aoBuscar(e.target.value)}
      />
      <div className="add-movie-form">
        <button type="button">+ Adicionar</button>
      </div>
    </header>
  );
}
