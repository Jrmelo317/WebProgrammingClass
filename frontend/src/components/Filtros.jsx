const STATUS = [
  { valor: "todos", rotulo: "Todos" },
  { valor: "assistido", rotulo: "Assistido" },
  { valor: "assistindo", rotulo: "Assistindo" },
  { valor: "quero", rotulo: "Quero assistir" },
];

function Filtros({ ativo, aoMudar }) {
  return (
    <nav className="button-container" aria-label="Filtrar filmes por status">
      {STATUS.map((s) => (
        <button
          key={s.valor}
          type="button"
          className={ativo === s.valor ? "button ativo" : "button"}
          aria-pressed={ativo === s.valor}
          onClick={() => aoMudar(s.valor)}
        >
          {s.rotulo}
        </button>
      ))}
    </nav>
  );
}
