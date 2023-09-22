const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const musicaFocoInput = document.querySelector("#alternar-musica");
const tempoNaTela = document.querySelector("#timer")
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const AudioPlay = new Audio("/sons/play.wav");
const AudioPausa = new Audio("sons/pause.mp3")
const iniciarOuPausarBt = document.querySelector("#start-pause span")
const PausarIMG = document.querySelector("#start-pause img")
let intervaldoId = null;


let tempoDecorridoEmSegundos = 1500;
musica.loop = true;


musicaFocoInput.addEventListener("change", () => {
    if(musica.paused) {
        
        musica.play();
        
        
    }else {
        musica.pause();
    }
})

 focoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto("foco")
    focoBt.classList.add("active")
    
 })

 curtoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto("descanso-curto");
    curtoBt.classList.add("active")
    
    
 })

 longoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto("descanso-longo");
    longoBt.classList.add("active");
    

 })

function alterarContexto (contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove("active");
    });

    html.setAttribute("data-contexto", contexto)
    banner.setAttribute("src", `/imagens/${contexto}.png`)
    switch(contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

            case "descanso-curto":
                titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong"> Faça uma pausa curta </strong>`
                break;

            case "descanso-longo":
                titulo.innerHTML = `Que tal voltar a superficie? <strong class="app__title-strong"> Faça uma pausa longa </strong>`
                break;

            default:
                break;
    }
           
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        zerar();
        alert("chegamos em 0")
        return;
    }

    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener("click", iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaldoId) {
        AudioPausa.play();
        zerar();
        return;
    }
    AudioPlay.play()
    intervaldoId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar";
    PausarIMG.setAttribute("src", "/imagens/pause.png");
    
}

function zerar() {
    clearInterval(intervaldoId);
    PausarIMG.setAttribute("src", "/imagens/play_arrow.png");
    iniciarOuPausarBt.textContent = "Começar";
    intervaldoId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {minute:"2-digit", second: "2-digit"})
    tempoNaTela.innerHTML =  `${tempoFormatado} `
}

mostrarTempo()
