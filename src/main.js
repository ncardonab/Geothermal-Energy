import "./styles.css";

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
  const herokuDomain = "geo-energy-api.herokuapp.com";
  const baseUrl = `https://${herokuDomain}/${endpoint}`;

  return fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

// Secretary Section
// Countries Buttons Rendering
(function () {
  const continentsBtns = document.querySelector(".continents-btns-container");

  // Añadiendo un propagador de eventos
  continentsBtns.addEventListener("click", (event) => {
    Array.from(continentsBtns.children).forEach((continent) => {
      continent.style.backgroundColor = "#585858";
    });

    // Traemos todos los continentes y filtramos por continente presionado
    fetch("https://geo-energy-api.herokuapp.com/continents")
      .then((response) => response.json())
      .then(({ continents }) => {
        if (event.target.className.includes("america")) {
          event.target.style.backgroundColor = "rgba(223, 133, 67, 1)";
          renderSelectedContinentButtons(continents[0].America);
        } else if (event.target.className.includes("europe")) {
          event.target.style.backgroundColor = "rgba(223, 133, 67, 1)";
          renderSelectedContinentButtons(continents[1].Europe);
        } else if (event.target.className.includes("asia")) {
          event.target.style.backgroundColor = "rgba(223, 133, 67, 1)";
          renderSelectedContinentButtons(continents[2].Asia);
        } else if (event.target.className.includes("oceania")) {
          event.target.style.backgroundColor = "rgba(223, 133, 67, 1)";
          renderSelectedContinentButtons(continents[3].Oceania);
        } else if (event.target.className.includes("africa")) {
          event.target.style.backgroundColor = "rgba(223, 133, 67, 1)";
          renderSelectedContinentButtons(continents[4].Africa);
        }
      });
  });

  function renderSelectedContinentButtons(continent) {
    const countriesButtonsContainer = document.querySelector(
      ".countries-btns-container"
    );

    // Borrando los botones renderizados anteriormente
    removeAllChildNodes(countriesButtonsContainer);

    continent.map((country) => {
      const button = renderCountryButton(country);
      countriesButtonsContainer.appendChild(button);
    });
  }

  function renderCountryButton({ name, id }) {
    const flag = document.createElement("img");
    const countryText = document.createElement("div.lead");
    const countryBtn = document.createElement("div");

    flag.setAttribute("src", `../images/${name}.png`);
    flag.className = "rounded-flag m-1";

    countryBtn.setAttribute("type", "button");
    countryBtn.className = `${id} country-btn btn btn-secondary btn-lg lead px-0`;
    countryBtn.style.width = "160px";
    countryBtn.style.position = "relative";

    countryText.className = "col-2";
    countryText.textContent = name;

    countryBtn.appendChild(flag);
    countryBtn.appendChild(countryText);

    return countryBtn;
  }
})();

// Institutions Cards Rendering
(function () {
  const countriesBtns = document.querySelector(".countries-btns-container");

  countriesBtns.addEventListener("click", (event) => {
    // Cambia el color al estandar cada vez que halla un nuevo click
    Array.from(countriesBtns.children).forEach((country) => {
      country.style.backgroundColor = "#585858";
    });

    // Obtiene el button y nos los elementos hijos del mismo
    let clickedButton = null;
    if (event.target.className.includes("country-btn")) {
      clickedButton = event.target;
    } else if (event.target.className.includes("countries-btns-container")) {
      clickedButton = null;
    } else {
      clickedButton = event.target.parentElement;
    }

    // Cada botón tiene su propio id del país
    let countryId = clickedButton.classList[0];

    fetch("https://geo-energy-api.herokuapp.com/institutions")
      .then((res) => res.json())
      .then(({ projects }) => {
        // Filtramos los proyectos por país seleccionado
        const projectsByCountryId = projects.filter(
          (project) => project.countryId === countryId
        );
        // Color activo, cuando se hace click
        clickedButton.style.backgroundColor = "#DF8543";
        renderSelectedCountryCards(projectsByCountryId);
      });
  });

  function renderSelectedCountryCards(country) {
    const institutionsCardsContainer = document.querySelector(
      ".institutions-cards-container"
    );

    // Borrando los botones renderizados anteriormente
    removeAllChildNodes(institutionsCardsContainer);

    country.map((project) => {
      const card = renderProjectCard(project);
      institutionsCardsContainer.innerHTML += card;
    });
  }

  function renderProjectCard(project) {
    const background =
      project.background !== ""
        ? `<img src="${project.background}" class="institution-card-img-top"></img>`
        : `<div class="institution-card-img-top"></div>`;

    return `<div class="card institution-card">
              ${background} 
              <div class="card-body institution-card-body">
                <div class="row">
                  <div class="col-2">
                    <img src="${project.logo}" alt="" class="logo"></img>
                  </div>
                  <div class="col-10">
                    <h5 class="card-title lead">${project.name}</h5>
                  </div>
                </div>
                <div class="card-notch"></div>
              </div>
            </div>
          </div>`;
  }
})();

// Reserchers
(function () {
  let counter = 0;

  // First rendering
  fetch("https://geo-energy-api.herokuapp.com/researchers")
    .then((response) => response.json())
    .then(({ researchers }) => {
      renderResearchersProfiles(researchers, 0);
    })
    .catch((err) => console.log(err));

  // Pagination buttons
  const next = document.querySelector(".next-icon");
  const previous = document.querySelector(".previous-icon");

  // Next button
  next.addEventListener("click", (event) => {
    counter += 4;

    fetch("https://geo-energy-api.herokuapp.com/researchers")
      .then((response) => response.json())
      .then(({ researchers }) => {
        renderResearchersProfiles(researchers, counter);
      });
  });

  // Previous button
  previous.addEventListener("click", (event) => {
    counter -= 4;

    fetch("https://geo-energy-api.herokuapp.com/researchers")
      .then((response) => response.json())
      .then(({ researchers }) => {
        renderResearchersProfiles(researchers, counter);
      });
  });

  /**
   * @description Iterates over the array from the given number and renders each one of the objects
   * @param { Array } researchers
   * @param { Number } counter
   */
  function renderResearchersProfiles(researchers, counter) {
    // Cards container
    const researchersCardsContainer = document.querySelector(
      ".researchers-cards-container"
    );
    researchers.map((researcher, index) => {
      console.log("Index:", index, researcher.name);
      console.log("Counter: ", counter);
      if (index >= counter && index < counter + 4) {
        if (!researcher.isLeader && !researcher.isSecretary) {
          const researcherCard = renderResearcherProfile(researcher);
          researchersCardsContainer.innerHTML += researcherCard;
        } else {
          counter += 1;
        }
      }
    });
  }

  /**
   * @description Returns a pre scripted HTML Object
   * @param {Object} researcher
   */
  function renderResearcherProfile(researcher) {
    const profilePhoto = `../images/${researcher.name} ${researcher.lastname} ${researcher.currentMembershipCountry}.png`;

    return `<div class="researcher-card col-3">
              <img
                src="${profilePhoto}"
                alt="Researcher profile photo"
                class="researcher-img"
              />
              <h4 class="researcher-fullname my-3">${researcher.name} ${researcher.lastname}</h4>
              <p class="lead">${researcher.currentInstitution}</p>
              <div style="border-bottom: 1px solid gray; width: 85%;"></div>
              <a href="${researcher.linkedIn}" target="_blank">
                <i class="fab fa-linkedin fa-2x my-2"></i>
              </a>
            </div>`;
  }
})();

/**
 * @description Removes all the childs from a given element
 * @param { HTMLObjectElement } parent
 */
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
