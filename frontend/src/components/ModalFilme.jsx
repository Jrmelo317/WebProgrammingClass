const VAZIO = {
  titulo: "",
  ano: "",
  genero: "",
  status: "quero",
  nota: 3,
  poster: "",
  comentario: "",
};

function ModalFilme({ filme, aoSalvar, aoFechar }) {
  const [dados, setDados] = useState({ ...VAZIO, ...filme });

  function atualizar(campo, valor) {
    setDados((anteriores) => ({ ...anteriores, [campo]: valor }));
  }

  function submeter(evento) {
    evento.preventDefault();
    aoSalvar({
      ...dados,
      ano: Number(dados.ano),
      nota: Number(dados.nota),
    });
  }

  return (
    <div id="modal" role="dialog" aria-modal="true" aria-labelledby="titulo-modal">
      <div className="modal-conteudo">
        <form id="form-filme" onSubmit={submeter}>
          <h2 id="titulo-modal">{filme.id ? "Editar Filme" : "Adicionar Filme"}</h2>
          <div className="campo">
            <label htmlFor="titulo">Título</label>
            <input id="titulo" required value={dados.titulo}
              onChange={(e) => atualizar("titulo", e.target.value)} />
          </div>
          <div className="campo">
            <label htmlFor="ano">Ano</label>
            <input id="ano" type="number" required value={dados.ano}
              onChange={(e) => atualizar("ano", e.target.value)} />
          </div>
          <div className="campo">
            <label htmlFor="genero">Gênero</label>
            <input id="genero" required value={dados.genero}
              onChange={(e) => atualizar("genero", e.target.value)} />
          </div>
          <div className="campo">
            <label htmlFor="status">Status</label>
            <select id="status" value={dados.status}
              onChange={(e) => atualizar("status", e.target.value)}>
              <option value="quero">Quero assistir</option>
              <option value="assistindo">Assistindo</option>
              <option value="assistido">Assistido</option>
            </select>
          </div>
          <div className="campo">
            <label htmlFor="nota">Nota</label>
            <input id="nota" type="number" min="1" max="5" required value={dados.nota}
              onChange={(e) => atualizar("nota", e.target.value)} />
          </div>
          <div className="campo">
            <label htmlFor="poster">URL do pôster</label>
            <input id="poster" type="url" value={dados.poster}
              onChange={(e) => atualizar("poster", e.target.value)} />
          </div>
          <div className="campo campo-comentario">
            <label htmlFor="comentario">Comentário</label>
            <textarea id="comentario" value={dados.comentario}
              onChange={(e) => atualizar("comentario", e.target.value)} />
          </div>
          <div className="acoes">
            <button type="button" onClick={aoFechar}>Cancelar</button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
