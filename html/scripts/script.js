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

let filmes = [...filmesInicias];

let statusAtivo = 'todos';

const renderizarCards = () => {
    const container = document.querySelector('.movie-cards-containers');
    container.innerHTML = '';

    const filmesVisiveis = statusAtivo === 'todos' ? filmes : filmes.filter((filme) => filme.status === statusAtivo);

    filmesVisiveis.forEach((filme) => {
        const card = document.createElement('div');
        card.classList.add('movie-card');

        card.innerHTML = `
            <img src="${filme.poster}" alt="${filme.titulo}" class="poster">
            <article class="info-container">
                <h2>${filme.titulo}</h2>
                <p>Ano: ${filme.ano}</p>
                <p>Gênero: ${filme.genero}</p>
                <p class="nota">Nota: ${'★'.repeat(filme.nota)}${'☆'.repeat(5 - filme.nota)}</p>
                <p class="status">${rotuloStatus(filme.status)}</p>
                <p class="comentario">${filme.comentario}</p>
                <div>
                <button class="btn-editar" data-id="${filme.id}">Editar</button>
                <button class="btn-remover" data-id="${filme.id}">Excluir</button>
                </div>
            </article>
        `;

        container.appendChild(card);
    });
};

const lista = document.querySelector('.movie-cards-containers');

lista.addEventListener('click', (event) => {
    const button = event.target.closest('.btn-remover');
    if (!button) return;

    const id = Number(button.dataset.id);
    filmes = filmes.filter((filme) => filme.id !== id);
    renderizarCards();
});


const nav = document.querySelector('.button-container');

nav.addEventListener('click', (event) => {
    const button = event.target.closest('[data-status]');
    if (!button) return;

    nav.querySelector('.ativo')?.classList.remove('ativo');
    button.classList.add('ativo');

    statusAtivo = button.dataset.status;
    renderizarCards();
});