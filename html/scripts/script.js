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
 