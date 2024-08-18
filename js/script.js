
function jsonConvert() {
    fetch('./info.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(innerCard)
        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));

}

function innerCard(item) {
    console.log(item.titulo)
    const cardInfo = document.getElementById("info");

    cardInfo.innerHTML += `
    <a href="infos.html?id=${item.id}" class="card-link">
    <div class="card-info" style = "background-image: linear-gradient(to right, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 80%, transparent 100%),
    url(${item.image});">
        <div class="card-info-intro">
        <h2>${item.titulo}</h2>
    </div>
    <div class="card-info-pgh">
        <p>${item.descrição}</p>
    </div>
    </a>
 `;
}


jsonConvert()