import { filmesIniciais } from './filmes.js';
import { mediaNotas, contagemPorStatus, ordenarPorNota } from './estatisticas.js';

console.log('Média das notas:', mediaNotas(filmesIniciais));
console.log('Contagem por status:', contagemPorStatus(filmesIniciais));
console.log('Filmes ordenados por nota:', ordenarPorNota(filmesIniciais));
console.log('Lista original após ordenar:', filmesIniciais);
