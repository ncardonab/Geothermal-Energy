document.addEventListener("DOMContentLoaded", renderNews);

function renderNews() {
  const newsCards = [
    document.querySelector(".news-card-1"),
    document.querySelector(".news-card-2"),
    document.querySelector(".news-card-3"),
  ];

  fetchNewsFromAPI().then((newsArray) => {
    newsArray.map((news, index) => {
      const { url, thumbnail, caption } = news;
      const aTag = newsCards[index].children[1];
      const imgTagContainer = newsCards[index].children[0];
      const image = document.createElement("img");

      image.setAttribute("src", thumbnail);
      imgTagContainer.appendChild(image);
      aTag.setAttribute("href", url);
      aTag.textContent = caption;
    });
  });
}

function fetchNewsFromAPI() {
  const baseUrl = "http://localhost:3000/news";

  return fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => data);
}
