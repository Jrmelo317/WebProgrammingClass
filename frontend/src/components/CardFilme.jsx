function estrelas(nota) {
  return "★".repeat(nota) + "☆".repeat(5 - nota);
}

const ROTULOS = {
  assistido: "Assistido",
  assistindo: "Assistindo",
  quero: "Quero assistir",
};

function CardFilme({ filme }) {
  return (
    <article className="movie-card">
      <img className="poster" src={filme.poster} alt={`Pôster de ${filme.titulo}`} />
      <div className="info-container">
        <h2>{filme.titulo}</h2>
        <p>Ano: {filme.ano}</p>
        <p>Gênero: {filme.genero}</p>
        <p className="nota" aria-label={`Nota: ${filme.nota} de 5`}>Nota: {estrelas(filme.nota)}</p>
        <p className={`status status-${filme.status}`}>{ROTULOS[filme.status]}</p>
        {filme.comentario && <p className="comentario">{filme.comentario}</p>}
        <div>
          <button type="button" className="btn-editar" aria-label={`Editar ${filme.titulo}`}>Editar</button>
          <button type="button" className="btn-remover" aria-label={`Excluir ${filme.titulo}`}>Excluir</button>
        </div>
      </div>
    </article>
  );
}
