const rotuloStatus = (status) => {
    switch (status) {
        case 'assistido':
            return 'Assistido';
        case 'assistindo':
            return 'Assistindo';
        case 'quero_assistir':
            return 'Quero Assistir';
        default:
            return 'Desconhecido';
    }
};

function estrelas(quantidade) {
    let nota = 'Nota: ';

    for (let i = 1; i <= 5; i++) {
        if (i <= quantidade) {
            nota += '★';
        } else {
            nota += '☆';
        }
    }

    const notas = document.querySelectorAll('.nota');

    notas.forEach(function (elemento) {
        elemento.textContent = nota;
    });

    console.log(quantidade);
}

const alvosStatus = document.querySelectorAll('.info-container .status');

alvosStatus.forEach((alvo) => {
    alvo.textContent = rotuloStatus('assistido');
});

const filmesInicias = [
    {
        id: 1,
        titulo: 'A Origem',
        ano: 2010,
        genero: 'Ficção Científica',
        poster: 'https://media.themoviedb.org/t/p/w600_and_h900_face/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg',
        nota: 4,
        status: 'assistido',
        comentario: 'Um filme incrível que desafia a mente e a realidade. A trama é complexa, mas recompensadora, com efeitos visuais impressionantes e uma atuação brilhante de Leonardo DiCaprio.',
    },
    {
        id: 2,
        titulo: 'Parasita',
        ano: 2019,
        genero: 'Suspense',
        poster: 'https://media.themoviedb.org/t/p/w600_and_h900_face/igw938inb6Fy0YVcwIyxQ7Lu5FO.jpg',
        nota: 5,
        status: 'assistido',
        comentario: 'Um filme que explora a desigualdade social de maneira poderosa e impactante. A narrativa é envolvente e os personagens são bem desenvolvidos.',
    },
    {
        id: 3,
        titulo: 'O Grande Hotel Budapeste',
        ano: 2014,
        genero: 'Comédia',
        poster: 'https://media.themoviedb.org/t/p/w600_and_h900_face/yabOguSrb8ffUXCkI6t8Rw7xtSh.jpg',
        nota: 3,
        status: 'assistindo',
        comentario: 'Um filme visualmente deslumbrante com uma narrativa única e personagens excêntricos. A direção de Wes Anderson é impecável, criando um mundo encantador e cativante.',
    },
    {
        id: 4,
        titulo: 'A Rede Social',
        ano: 2010,
        genero: 'Drama',
        poster: 'https://media.themoviedb.org/t/p/w600_and_h900_face/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg',
        nota: 4,
        status: 'quero_assistir',
        comentario: 'Um filme que retrata a ascensão do Facebook e os desafios enfrentados por seus fundadores. A narrativa é envolvente e a atuação de Jesse Eisenberg é notável.',
    },
    {
        id: 5,
        titulo: 'Mad Max: Estrada da Fúria',
        ano: 2015,
        genero: 'Ação',
        poster: 'https://media.themoviedb.org/t/p/w600_and_h900_face/hA2ple9q4qnwxp3hKVNhroipsir.jpg',
        nota: 5,
        status: 'assistido',
        comentario: 'Um filme de ação eletrizante com cenas de perseguição impressionantes e uma narrativa intensa. A atuação de Charlize Theron é excepcional, tornando o filme ainda mais memorável.',
    },
    {
        id: 6,
        titulo: 'La La Land: Cantando Estações',
        ano: 2016,
        genero: 'Musical',
        poster: 'https://media.themoviedb.org/t/p/w600_and_h900_face/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
        nota: 4,
        status: 'assistindo',
        comentario: 'Um filme musical encantador que celebra a paixão pela música e pelo amor. A química entre Ryan Gosling e Emma Stone é palpável, e as músicas são cativantes e memoráveis.',
    }
]

const CHAVE_FILMES = 'cinetrack:filmes';

function carregar() {
    try {
        const salvo = localStorage.getItem(CHAVE_FILMES);

        if (salvo === null) return [...filmesInicias];

        const dados = JSON.parse(salvo);
        return Array.isArray(dados) ? dados : [...filmesInicias];
    } catch {
        return [...filmesInicias];
    }
}

let filmes = carregar();

function salvar() {
    localStorage.setItem(CHAVE_FILMES, JSON.stringify(filmes));
}

let statusAtivo = 'todos';

function criarCard(filme) {
    const card = document.createElement('div');
    card.className = 'movie-card';

    const imagem = document.createElement('img');
    imagem.className = 'poster';
    imagem.src = filme.poster;
    imagem.alt = `Pôster de ${filme.titulo}`;

    const info = document.createElement('article');
    info.className = 'info-container';

    const titulo = document.createElement('h2');
    titulo.textContent = filme.titulo;

    function paragrafo(texto, classe) {
        const p = document.createElement('p');
        p.textContent = texto;
        if (classe) p.className = classe;
        return p;
    }

    const acoes = document.createElement('div');

    const editar = document.createElement('button');
    editar.className = 'btn-editar';
    editar.dataset.id = filme.id;
    editar.textContent = 'Editar';
    editar.setAttribute('aria-label', `Editar ${filme.titulo}`);

    const remover = document.createElement('button');
    remover.className = 'btn-remover';
    remover.dataset.id = filme.id;
    remover.textContent = 'Excluir';
    remover.setAttribute('aria-label', `Excluir ${filme.titulo}`);

    acoes.append(editar, remover);
    info.append(
        titulo,
        paragrafo(`Ano: ${filme.ano}`),
        paragrafo(`Gênero: ${filme.genero}`),
        paragrafo(`Nota: ${'★'.repeat(filme.nota)}${'☆'.repeat(5 - filme.nota)}`, 'nota'),
        paragrafo(rotuloStatus(filme.status), 'status'),
        paragrafo(filme.comentario, 'comentario'),
        acoes
    );
    card.append(imagem, info);

    return card;
}

const busca = document.querySelector('.input-text-film');

function aplicarFiltros() {
    const termo = busca.value.trim().toLowerCase();

    return filmes.filter((filme) =>
    (statusAtivo === 'todos' || filme.status === statusAtivo) &&
    (filme.titulo.toLowerCase().includes(termo))
    );
}

const renderizarCards = (filmesVisiveis) => {
    const container = document.querySelector('.movie-cards-containers');
    const fragmento = document.createDocumentFragment();

    filmesVisiveis.forEach((filme) => {
        fragmento.appendChild(criarCard(filme));
    });

    container.replaceChildren(fragmento);
};

function atualizar() {
    renderizarCards(aplicarFiltros());
}

const lista = document.querySelector('.movie-cards-containers');

lista.addEventListener('click', (event) => {
    const botaoEditar = event.target.closest('.btn-editar');

    if (botaoEditar) {
        const id = Number(botaoEditar.dataset.id);
        const filme = filmes.find((item) => item.id === id);
        if (!filme) return;

        abrir();
        document.querySelector('#titulo-modal').textContent = 'Editar Filme';
        formulario.elements.titulo.value = filme.titulo;
        formulario.elements.ano.value = filme.ano;
        formulario.elements.genero.value = filme.genero;
        formulario.elements.poster.value = filme.poster;
        formulario.elements.status.value = filme.status;
        formulario.elements.nota.value = filme.nota;
        formulario.elements.comentario.value = filme.comentario;
        editandoId = id;
        return;
    }

    const botaoRemover = event.target.closest('.btn-remover');
    if (!botaoRemover) return;

    const id = Number(botaoRemover.dataset.id);
    filmes = filmes.filter((filme) => filme.id !== id);
    salvar();
    atualizar();
})


const nav = document.querySelector('.button-container');

nav.addEventListener('click', (event) => {
    const button = event.target.closest('[data-status]');
    if (!button) return;

    const anterior = nav.querySelector('.ativo');
    anterior?.classList.remove('ativo');
    anterior?.setAttribute('aria-pressed', 'false');
    button.classList.add('ativo');
    button.setAttribute('aria-pressed', 'true');

    statusAtivo = button.dataset.status;
    atualizar();
});

const modal = document.querySelector('.modal');
const formulario = document.querySelector('#form-filme');

let editandoId = null;
let focoAnterior;

function abrir() {
    focoAnterior = document.activeElement;
    formulario.reset();
    document.querySelector('#titulo-modal').textContent = 'Adicionar Filme';
    document.querySelector('#erros-formulario').textContent = '';
    editandoId = null;
    modal.classList.add('aberto');
    document.querySelectorAll('header, main, footer').forEach((elemento) => elemento.inert = true);
    formulario.elements.titulo.focus();
}

function fechar() {
    if (!modal.classList.contains('aberto')) return;
    modal.classList.remove('aberto');
    document.querySelectorAll('header, main, footer').forEach((elemento) => elemento.inert = false);
    if (focoAnterior?.isConnected) focoAnterior.focus();
}

document.querySelector('.header-content .add-movie-form button').addEventListener('click', abrir);

document.querySelector('.acoes button[type="button"]').addEventListener('click', fechar);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') fechar();
});

function validarFilme(filme) {
    const erros = [];

    if (!filme.titulo.trim()) erros.push('Informe o Titulo');
    if (!filme.genero.trim()) erros.push('Informe o Genero');
    if (!Number.isInteger(filme.ano) || filme.ano <= 0) erros.push('Informe um Ano válido');
    if (!Number.isInteger(filme.nota) || filme.nota < 1 || filme.nota > 5) erros.push('Informe uma Nota válida (1 a 5)');

    try {
        const url = new URL(filme.poster);
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
            erros.push('Informe uma URL válida para o Poster');
        }
    } catch {
        erros.push('Informe uma URL válida para o Poster');
    }

    return erros;
}

function gerarId() {
    return Math.max(0, ...filmes.map((filme) => filme.id)) + 1;
}

formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    const dados = Object.fromEntries(new FormData(formulario));
    dados.ano = Number(dados.ano);
    dados.nota = Number(dados.nota);

    const erros = validarFilme(dados);
    document.querySelector('#erros-formulario').textContent = erros.join(', ');

    if (erros.length > 0) return;

    if (editandoId === null) {
        filmes = [...filmes, { id: gerarId(), ...dados }];
    } else {
        filmes = filmes.map((filme) =>
            filme.id === editandoId ? { ...filme, ...dados } : filme
        );
    }

    salvar();
    atualizar();
    fechar();
});


function debounce(funcao, espera) {
    let temporizador;

    return (...args) => {
        clearTimeout(temporizador);
        temporizador = setTimeout(() => funcao(...args), espera);
    };
}

function aoDigitar() {
    atualizar();
}

busca.addEventListener('input', debounce(aoDigitar, 300));
