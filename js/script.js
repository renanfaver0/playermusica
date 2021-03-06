let musicas = [
    {titulo:'Otherside', artista:'Red Hot Chili Peppers', src:'musicas/Otherside.mp3',img:'imagens/rock.jpg'},
    {titulo:'Luz que me traz paz', artista:'Maneva', src:'musicas/Luz.mp3', img:'imagens/reggae.jpg'},
    {titulo:'Round 6 Remix', artista:'Zedd', src:'musicas/Round6.mp3', img:'imagens/eletronica.jpg'}
];

// Variáveis utilizadas
let musica = document.querySelector('audio');
let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim-musica');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.titulo h2');
let nomeArtista = document.querySelector('.titulo i');

renderizarMusica(indexMusica);

// Eventos utilizados
document.querySelector('.botao-play').addEventListener('click', tocarMusica);
document.querySelector('.botao-pause').addEventListener('click', pausarMusica);
musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = 2;
    }
    renderizarMusica(indexMusica);
});

document.querySelector('.posterior').addEventListener('click', () => {
    indexMusica++;
    if(indexMusica > 2) {
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
});

// Funções utilizadas
function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
}

function tocarMusica() {
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica() {
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra() {
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio-musica');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }

    return campoMinutos+ ':'+campoSegundos;
}
