const API_KEY = "4d9d12af76604df0a8b1f3c82f147f60";
const URL = "https://newsapi.org/v2/everything?q=";


window.addEventListener("load", () => fatchNews("India"));

const fatchNews = async (query) => {
    const response = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    bindData(data.articles);
}





const bindData = (articles) => {
    const cardsContainer = document.querySelector("#cards-container");
    const newsCardTamplte = document.querySelector("#template-news-card");

    cardsContainer.innerHTML = ``;
    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTamplte.content.cloneNode(true);
        filDataInCard(cardClone, article);
        cardsContainer.append(cardClone);
    });
}

const filDataInCard = (cardClone, article) => {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} • ${date}`;


    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}



let curSelectNav = null;
const onNavClick = (id) => {
    fatchNews(id);
    const navItem = document.getElementById(id);
    curSelectNav?.classList.remove('active');
    curSelectNav = navItem;
    // console.log(curSelectNav);
    curSelectNav?.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");


searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fatchNews(query);
    searchText.value="";
    curSelectNav?.classList.remove("active");
    curSelectNav = null;
})

const reload = document.getElementById("reload");

reload.addEventListener("click", () => window.location.reload());


