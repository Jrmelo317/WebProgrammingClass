function Header() {
  return (
    <header className="header-content">
      <h1 className="title">CineTrack</h1>
      <input
        type="search"
        className="input-text-film"
        placeholder="Buscar filme..."
        aria-label="Buscar filme"
      />
      <div className="add-movie-form">
        <button type="button">+ Adicionar</button>
      </div>
    </header>
  );
}
