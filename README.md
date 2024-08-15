

# Projeto de Sorteio de Cards
## Sumário

- [Descrição Geral](#descrição-geral)
- [Estrutura do Objeto de Cartas](#estrutura-do-objeto-de-cartas)
- [Funcionalidades Principais](#funcionalidades-principais)
  - [Função drawCard()](#função-drawcard)
  - [Função drawSpeak()](#função-drawspeak)
  - [Função cardView()](#função-cardview)
- [Como Executar o Código](#como-executar-o-código)
- [Como Contribuir](#como-contribuir)
- [Licença](#licença)

## Descrição Geral

Este projeto foi desenvolvido para simular um sistema de sorteio de cartas, onde cada carta possui um conjunto de falas com probabilidades específicas. O sistema permite que uma carta seja sorteada com base nas suas probabilidades e também seleciona uma fala da carta de acordo com as probabilidades das falas.

## Estrutura do Objeto de Cartas

As cartas são definidas em um objeto JavaScript, onde cada carta tem propriedades específicas que incluem um ID, nome, tipo, nacionalidade, um objeto de falas, descrição, probabilidade de ser sorteada, e uma URL de imagem. Aqui está um exemplo da estrutura de uma carta:

```javascript
const cards = {
    "card 1": {
        id: 1,
        number: "#1",
        name: "E-grill",
        type: "Mitica",
        nationality: "???",
        speak: {
            mythical: { text: "“Eu não só viro cabeças, também viro a grelha!”", probability: 40 },
            legendary: { text: "“Temperando cada momento com uma pitada de fogo e charme!”", probability: 35 },
            rare: { text: "“Grelha quente, espírito ardente!”", probability: 15 },
            common: { text: "Comigo, a festa nunca acaba!", probability: 10 }
        },
        description: "Uma e-girl mítica, conhecida nos quatro cantos do mundo. Com uma grelha na mão e um espírito festivo, ela ilumina cada lugar com alegria e boa energia",
        probability: 1,
        image: "https://i.pinimg.com/236x/3a/a6/22/3aa622c900041633f8fb3f6917cf5904.jpg"
    },
    // Outras cartas seguem o mesmo formato
};
```

## Funcionalidades Principais

### Função `drawCard()`

A função `drawCard()` é responsável por sortear uma carta com base nas probabilidades definidas para cada carta no objeto `cards`.

#### Código da Função

```javascript
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
```

#### Explicação

1. **Conversão do Objeto de Cartas**: A função começa convertendo o objeto `cards` em um array de entradas usando `Object.entries()`. Isso facilita a iteração sobre cada carta.

2. **Cálculo da Probabilidade Total**: Em seguida, a função calcula a soma total das probabilidades de todas as cartas.

3. **Geração de um Valor Aleatório**: Um valor aleatório é gerado no intervalo de 0 até a soma total das probabilidades.

4. **Sorteio da Carta**: A função percorre cada carta, adicionando sua probabilidade à probabilidade cumulativa. Se o valor aleatório for menor que a probabilidade cumulativa, a carta correspondente é retornada.

### Função `drawSpeak()`

A função `drawSpeak()` sorteia uma fala específica da carta com base nas probabilidades das falas.

#### Código da Função

```javascript
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
```

#### Explicação

1. **Conversão do Objeto de Falas**: Semelhante à função `drawCard()`, esta função converte o objeto `speaks` em um array de entradas.

2. **Cálculo da Probabilidade Total**: Calcula a soma total das probabilidades de todas as falas disponíveis para a carta.

3. **Geração de um Valor Aleatório**: Um valor aleatório é gerado dentro do intervalo da soma total das probabilidades.

4. **Sorteio da Fala**: A função itera através das falas, adicionando suas probabilidades à probabilidade cumulativa. Se o valor aleatório for menor que a probabilidade cumulativa, a fala correspondente é retornada.

### Função `cardView()`

A função `cardView()` atualiza o conteúdo de um elemento HTML com as informações da carta sorteada e sua fala.

#### Código da Função

```javascript
function cardView() {
    const drawnCard = drawCard(cards);
    const drawnSpeak = drawSpeak(drawnCard.speak);
    const card = document.getElementById("card-1");

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
                <h3>${drawnSpeak}</h3>
                <p id="desc-text">${drawnCard.description}</p>
            </div>
        </div>`;
}
```

#### Explicação

1. **Sorteio da Carta e Fala**: Chama as funções `drawCard()` e `drawSpeak()` para sortear uma carta e uma fala, respectivamente.

2. **Atualização do Conteúdo HTML**: Utiliza o método `innerHTML` para atualizar o elemento HTML com ID `"card-1"` com as informações da carta e a fala sorteada.

3. **Exibição dos Detalhes da Carta**: O conteúdo HTML é formatado para incluir a imagem, número, nome, tipo, fala, e descrição da carta.

## Como Executar o Código

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/DiocelioJunior/Card-Game.git
   ```

2. **Abra o Arquivo HTML**:
   Abra o arquivo `index.html` (ou equivalente) em seu navegador para visualizar a interface do sorteio de cartas.

3. **Interaja com a Aplicação**:
   A aplicação sorteará uma carta automaticamente e exibirá suas informações, incluindo uma fala aleatória.

## Como Contribuir

1. Faça um fork do projeto.
2. Crie uma nova branch com a sua feature ou correção (`git checkout -b minha-feature`).
3. Faça o commit das suas alterações (`git commit -am 'Adiciona minha feature'`).
4. Faça o push para a branch (`git push origin minha-feature`).
5. Abra um Pull Request.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).
