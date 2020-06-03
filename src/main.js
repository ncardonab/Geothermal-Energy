document.addEventListener("DOMContentLoaded", renderNews);

function renderNews() {
  const newsCards = [
    document.querySelector(".news-card-1"),
    document.querySelector(".news-card-2"),
    document.querySelector(".news-card-3"),
  ];

  fetchNewsFrom("newsESP").then((newsArray) => {
    const news = newsArray[0];
    const { url, thumbnail, caption } = news;

    const aTag = newsCards[2].children[1];
    const imgTagContainer = newsCards[2].children[0];
    const image = document.createElement("img");

    image.setAttribute("src", thumbnail);
    imgTagContainer.appendChild(image);
    aTag.setAttribute("href", url);
    aTag.textContent = caption;
  });

  fetchNewsFrom("newsENG").then((newsArray) => {
    newsArray.map((news, index) => {
      if (index < 2) {
        const { url, thumbnail, caption } = news;

        const aTag = newsCards[index].children[1];
        const imgTagContainer = newsCards[index].children[0];
        const image = document.createElement("img");

        image.setAttribute("src", thumbnail);
        imgTagContainer.appendChild(image);
        aTag.setAttribute("href", url);
        aTag.textContent = caption;
      }
    });
  });
}

function fetchNewsFrom(endpoint) {
  const baseUrl = `http://localhost:3000/${endpoint}`;

  return fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => data);
}
