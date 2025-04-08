(function loadArticles() {
    fetch("https://jelsonmatheus.github.io/blog/artigos.json")
    .then(response => response.json())
    .then(data => showArticles(data))
    .catch(console.error);
})();

function showArticles(artigosArray) {
    const divCards = document.getElementById('div-cards');
    
    const card = document.getElementById('card');
    const category = document.getElementById('category');
    const img = document.getElementById('img');
    const title = document.getElementById('title');
    const text = document.getElementById('text');
    const data = document.getElementById('data');
    const link = document.getElementById('link');
    
    divCards.innerHTML = "";
    card.style.display = "block";
    
    artigosArray.reverse().forEach(artigo => {
        category.innerText = artigo.categoria;
        img.src = artigo.img;
        title.innerText = artigo.titulo;
        text.innerHTML = artigo.texto;
        data.innerText = artigo.data;
        link.href = artigo.link;
        
        divCards.innerHTML += card.outerHTML;
    });
}
