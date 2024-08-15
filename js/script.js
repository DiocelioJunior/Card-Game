// Objeto contendo todas as cartas com falas e probabilidades
// Quanto maior a probabilidade, mais fácil de as cartas saírem, 1 => Mítica
const cards = {
    "card 1": {
        id: 1,
        number: "#1",
        name: "E-grill",
        type: "Mítica",
        nationality: "???",
        speak: {
            mythical: { text: "“Eu não só viro cabeças, também viro a grelha!”", probability: 40 },
            legendary: { text: "“Temperando cada momento com uma pitada de fogo e charme!”", probability: 35 },
            rare: { text: "“Grelha quente, espírito ardente!”", probability: 15 },
            common: { text: "“Comigo, a festa nunca acaba!”", probability: 10 }
        },
        description: "Uma e-girl mítica, conhecida nos quatro cantos do mundo. Com uma grelha na mão e um espírito festivo, ela ilumina cada lugar com alegria e boa energia.",
        probability: 1,
        image: "https://i.pinimg.com/236x/3a/a6/22/3aa622c900041633f8fb3f6917cf5904.jpg"
    },
    "card 2": {
        id: 2,
        number: "#2",
        name: "Frosty",
        type: "Lendária",
        nationality: "Polar",
        speak: {
            mythical: { text: "“Deixe-me congelar o tempo para você!”", probability: 20 },
            legendary: { text: "“No reino do gelo, eu sou o soberano!”", probability: 50 },
            rare: { text: "“Cada floco de neve é uma obra-prima!”", probability: 20 },
            common: { text: "“O frio nunca me intimida!”", probability: 10 }
        },
        description: "Frosty é uma entidade lendária dos gelos eternos. Com um toque frio e majestoso, ele reina absoluto no reino do gelo.",
        probability: 50,
        image: "https://i.pinimg.com/474x/b9/c0/c6/b9c0c611998d2a04a364d5eb15795bdd.jpg"
    },
    "card 3": {
        id: 3,
        number: "#3",
        name: "Inferno",
        type: "Épica",
        nationality: "Infernal",
        speak: {
            mythical: { text: "“Eu sou o fogo que consome tudo!”", probability: 25 },
            legendary: { text: "“O calor do inferno é o meu lar!”", probability: 45 },
            rare: { text: "“Cuidado com as chamas, elas podem te consumir!”", probability: 20 },
            common: { text: "“Não há escuridão que o meu fogo não possa iluminar!”", probability: 10 }
        },
        description: "Inferno é um ser de fogo intenso, conhecido por sua força devastadora e presença imponente.",
        probability: 20,
        image: "https://i.pinimg.com/236x/aa/74/ef/aa74ef96ef0e9de926389fa49410b1ee.jpg"
    },
    "card 4": {
        id: 4,
        number: "#4",
        name: "Zephyr",
        type: "Mítica",
        nationality: "Aéreo",
        speak: {
            mythical: { text: "“Eu sou o vento que soprou as tempestades!”", probability: 30 },
            legendary: { text: "“As correntes do ar são minhas aliadas!”", probability: 40 },
            rare: { text: "“Siga o vento e encontre seu destino!”", probability: 20 },
            common: { text: "“O vento é a minha canção eterna!”", probability: 10 }
        },
        description: "Zephyr é uma entidade mítica dos ventos, trazendo mudanças e força através dos ventos que ele controla.",
        probability: 80,
        image: "https://i.pinimg.com/564x/f0/57/c8/f057c83d5dcc0031c7829d1a4cd54ddc.jpg"
    }
};

// Função para sortear uma carta com base nas probabilidades
function drawCard(cards) {
    const cardEntries = Object.entries(cards); // Converte o objeto de cartas em um array de entradas
    let totalProbability = 0;

    // Calcula a soma total das probabilidades das cartas
    for (const [, card] of cardEntries) {
        totalProbability += card.probability;
    }

    // Gera um número aleatório entre 0 e a soma total das probabilidades
    const randomValue = Math.random() * totalProbability;

    let cumulativeProbability = 0;

    // Percorre as cartas para encontrar a carta sorteada
    for (const [, card] of cardEntries) {
        cumulativeProbability += card.probability;

        if (randomValue < cumulativeProbability) {
            return card; // Retorna o objeto da carta sorteada
        }
    }
}

// Função para sortear uma fala da carta com base nas probabilidades
function drawSpeak(speaks) {
    const speakEntries = Object.entries(speaks); // Converte o objeto de falas em um array de entradas
    let totalProbability = 0;

    // Calcula a soma total das probabilidades das falas
    for (const [, speak] of speakEntries) {
        totalProbability += speak.probability;
    }

    // Gera um número aleatório entre 0 e a soma total das probabilidades
    const randomValue = Math.random() * totalProbability;

    let cumulativeProbability = 0;

    // Percorre as falas para encontrar a fala sorteada
    for (const [, speak] of speakEntries) {
        cumulativeProbability += speak.probability;

        if (randomValue < cumulativeProbability) {
            return speak.text; // Retorna o texto da fala sorteada
        }
    }
}

// Sorteia uma carta
const drawnCard = drawCard(cards);

// Sorteia uma fala da carta sorteada
const drawnSpeak = drawSpeak(drawnCard.speak);

// Atualiza o conteúdo do elemento HTML com os detalhes da carta sorteada
const card = document.getElementById("card-1");

function cardView() {
    card.innerHTML = `
        <div class="card-img">
            <img src="${drawnCard.image}" alt="player-img">
        </div>
        <div class="line">
            <!-- Linha de separação -->
        </div>
        <div class="card-level">
            <div class="card-level-nmb">
                <h1>${drawnCard.number}</h1>
            </div>
        </div>
        <div class="card-att">
            <div class="card-att-type">
                <span class="material-symbols-outlined">
                    spa
                </span>
            </div>
            <div class="card-att-hero">
                <h1>${drawnCard.name}</h1>
                <div class="card-att-hero-sts">
                    <p>❤ ❤ ❤</p>
                    <p>|</p>
                    <p>${drawnCard.type.toUpperCase()}</p>
                </div>
                <p>${drawnSpeak}</p>
                <br>
                <p id="desc-text">${drawnCard.description}</p>
            </div>
        </div>`;
}

cardView();

console.log(`A carta sorteada foi: ${drawnCard.name}`);
console.log(`Número: ${drawnCard.number}`);
console.log(`Descrição: ${drawnCard.description}`);
console.log(`Fala sorteada: ${drawnSpeak}`);
