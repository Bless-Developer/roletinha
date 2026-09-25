let dadosJogos = [];
let ordemRoleta = [];
let promoAtual = 0;

let jogoSorteado = null;

const roleta = document.querySelector(".roulette");

const promoArt = document.getElementById("res-promo");

const resultado = document.querySelector(".resultado");
const areaRoleta = document.getElementById("area-roleta")

const transicao = document.getElementById("transic")

const resNome = document.getElementById("res-name");
const resDesc = document.getElementById("res-desc");

const botao = document.getElementById("btn");
const botaoJogo = document.getElementById("btn2")

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const indicadores = document.getElementById("ind");

fetch("./data/games.json")
.then(resposta => resposta.json())
.then(dados => {
    dadosJogos = dados;

    let randomize = [...dadosJogos];

    randomize.sort(() => Math.random() - 0.5);

    ordemRoleta = randomize;

    for (let i = 0; i < 20; i++){

    randomize.forEach((jogo, index) => {
        const imagem = document.createElement("img");

        imagem.src = jogo.image;

        imagem.dataset.index = index;

        imagem.classList.add("games");

        roleta.appendChild(imagem);
    });

};
        
});

botao.addEventListener("click", () => {

    const posicao = 100 + Math.floor(Math.random() * 30);

    const jogo = roleta.children[posicao];

const centroTela = window.innerWidth / 2;

const rect = jogo.getBoundingClientRect();

const centroJogo = rect.left + rect.width / 2;

const deslocamento = centroTela - centroJogo;

roleta.style.transform = `translateX(${deslocamento}px)`;

    roleta.addEventListener("transitionend", () => {

        iniciarTransicao();

        setTimeout(() => {
            areaRoleta.style.display = "none";
            resultado.style.display = "block";
            finalizarTransicao();
        }, 4000);
    }, {once: true});

    const indiceJogo = posicao % ordemRoleta.length;

    jogoSorteado = ordemRoleta[indiceJogo];

    resNome.textContent = jogoSorteado.nome;
    resDesc.textContent = jogoSorteado.descript;

    if (jogoSorteado.promo){
        promoArt.src = jogoSorteado.promo[0];

        atualizarIndicacao();
    } else{
        promoArt.src = jogoSorteado.image;
        indicadores.innerHTML = "";
    };

    
});

botaoJogo.addEventListener("click", () => {

    window.open(jogoSorteado.link, "_blank");
    
});

nextBtn.addEventListener("click", () => {
    if(!jogoSorteado.promo) return;

    promoAtual++;

    if (promoAtual >= jogoSorteado.promo.length) {
        promoAtual = 0;
    };

    promoArt.src = jogoSorteado.promo[promoAtual];

    atualizarIndicacao();

})

prevBtn.addEventListener("click", () => {

    if(!jogoSorteado.promo) return;
    
    promoAtual--;

    if (promoAtual < 0) {
        promoAtual = jogoSorteado.promo.length - 1;
    };

    promoArt.src = jogoSorteado.promo[promoAtual];

    atualizarIndicacao();
})

function atualizarIndicacao() {
    indicadores.innerHTML = "";

    jogoSorteado.promo.forEach((_, index) => {
        const indic = document.createElement("span");

        indic.textContent = "●";

        if (index === promoAtual) {
            indic.classList.add("ative");
        }

        indicadores.appendChild(indic);
    })
};

function iniciarTransicao() {
    transicao.style.opacity = "1";
}

function finalizarTransicao() {
    transicao.style.opacity = "0";
}