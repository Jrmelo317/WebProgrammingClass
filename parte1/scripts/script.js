const rotuloStatus = (status) => {
    switch (status) {
        case 'assistido':
            return 'Assistido';
        case 'assistindo':
            return 'Assistindo';
        case 'quero':
            return 'Quero Assistir';
        default:
            return 'Desconhecido';
    }
};

const filmesIniciais = [
    {
        id: 1,
        titulo: 'A Origem',
        ano: 2010,
        genero: 'Ficção científica',
        poster: 'https://media.themoviedb.org/t/p/w600_and_h900_face/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg',
        nota: 5,
        status: 'assistido',
        comentario: 'Revejo sempre.',
    },
    {
        id: 2,
        titulo: 'Parasita',
        ano: 2019,
        genero: 'Suspense',
        poster: 'https://media.themoviedb.org/t/p/w600_and_h900_face/igw938inb6Fy0YVcwIyxQ7Lu5FO.jpg',
        nota: 4,
        status: 'assistido',
        comentario: '',
    },
    {
        id: 3,
        titulo: 'O Auto da Compadecida',
        ano: 2000,
        genero: 'Comédia',
        poster: 'https://image.tmdb.org/t/p/w500/xWCKF7hgOicb3A0XiY13SdlwRcn.jpg',
        nota: 5,
        status: 'assistido',
        comentario: 'Classico nacional.',
    },
    {
        id: 4,
        titulo: 'Duna: Parte Dois',
        ano: 2024,
        genero: 'Ficção científica',
        poster: 'https://image.tmdb.org/t/p/w500/zjuI52fmUS1YGMQm53UYTTgOg0K.jpg',
        nota: 4,
        status: 'assistindo',
        comentario: '',
    },
    {
        id: 5,
        titulo: 'Interestelar',
        ano: 2014,
        genero: 'Ficção científica',
        poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        nota: 5,
        status: 'quero',
        comentario: '',
    },
    {
        id: 6,
        titulo: 'Cidade de Deus',
        ano: 2002,
        genero: 'Drama',
        poster: 'https://image.tmdb.org/t/p/w500/gfnXixcGC060QcG6JPxN6AMdVsq.jpg',
        nota: 4,
        status: 'quero',
        comentario: '',
    }
]

const CHAVE_FILMES = 'cinetrack:filmes';

function carregar() {
    try {
        const salvo = localStorage.getItem(CHAVE_FILMES);

        if (salvo === null) return [...filmesIniciais];

        const dados = JSON.parse(salvo);
        return Array.isArray(dados)
            ? dados.map((filme) => ({ ...filme, status: filme.status === 'quero_assistir' ? 'quero' : filme.status }))
            : [...filmesIniciais];
    } catch {
        return [...filmesIniciais];
    }
}

let filmes = carregar();

function salvar() {
    localStorage.setItem(CHAVE_FILMES, JSON.stringify(filmes));
}

let statusAtivo = 'todos';
let ordenacaoAtual = 'titulo';

function criarCard(filme) {
    const card = document.createElement('div');
    card.className = 'movie-card';

    const imagem = document.createElement('img');
    imagem.className = 'poster';
    imagem.src = filme.poster || 'assets/img/sem-poster.svg';
    imagem.alt = filme.poster ? `Pôster de ${filme.titulo}` : `Pôster não informado para ${filme.titulo}`;
    imagem.onerror = () => {
        imagem.onerror = null;
        imagem.src = 'assets/img/sem-poster.svg';
    };

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
        paragrafo(rotuloStatus(filme.status), `status status-${filme.status}`),
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
    const visiveis = aplicarFiltros();
    visiveis.sort((a, b) => {
        if (ordenacaoAtual === 'ano') return a.ano - b.ano;
        if (ordenacaoAtual === 'nota') return b.nota - a.nota;
        return a.titulo.localeCompare(b.titulo, 'pt-BR');
    });
    renderizarCards(visiveis);
}

document.querySelector('#ordenar').addEventListener('change', (event) => {
    ordenacaoAtual = event.target.value;
    atualizar();
});

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
    const filme = filmes.find((item) => item.id === id);
    if (!filme || !window.confirm(`Excluir ${filme.titulo}?`)) return;

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
    if (!Number.isInteger(filme.ano) || filme.ano < 1888 || filme.ano > 2100) erros.push('Informe um Ano entre 1888 e 2100');
    if (!Number.isInteger(filme.nota) || filme.nota < 1 || filme.nota > 5) erros.push('Informe uma Nota válida (1 a 5)');

    if (!['assistido', 'assistindo', 'quero'].includes(filme.status)) erros.push('Selecione um Status válido');

    if (filme.poster.trim()) {
        try {
            const url = new URL(filme.poster);
            if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                erros.push('Informe uma URL válida para o Poster');
            }
        } catch {
            erros.push('Informe uma URL válida para o Poster');
        }
    }

    return erros;
}

function gerarId() {
    return Math.max(0, ...filmes.map((filme) => filme.id)) + 1;
}

formulario.addEventListener('invalid', () => {
    const invalidos = [...formulario.elements].filter((campo) => campo.validity && !campo.validity.valid);
    document.querySelector('#erros-formulario').textContent = invalidos
        .map((campo) => `${campo.labels?.[0]?.textContent}: ${campo.validationMessage}`)
        .join(' ');
}, true);

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

atualizar();
