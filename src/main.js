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
    image.setAttribute("class", "img-fluid");
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
        image.setAttribute("class", "img-fluid");
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
})();

// Self Invoking Function (SIF) que renderiza los investigadores
(async function (doc) {
  const paginationContainer = doc.querySelector(".pagination-status");
  const pagStatus = +paginationContainer.getAttribute("data-status"); // el + es para volverlo un número

  // Pagination buttons
  const next = doc.querySelector(".next-icon");
  const previous = doc.querySelector(".previous-icon");

  try {
    // Trayendo los investigadores
    const RESPONSE = await fetch(
      "https://geo-energy-api.herokuapp.com/researchers"
    );
    let { researchers } = await RESPONSE.json();

    // Filtrando aquellos investigadores que no sean ni lideres ni secretarios
    let normalResearchers = researchers.filter(
      (researcher) => !researcher.isLeader && !researcher.isSecretary
    );

    // First rendering
    renderResearchersProfiles(normalResearchers, pagStatus);
    renderPaginationStatus(pagStatus, normalResearchers.length);

    // Next button click event
    next.addEventListener("click", (event) => {
      const previousState = +paginationContainer.getAttribute("data-status");
      const numberOfPages = +paginationContainer.textContent.split("/")[1] - 1;

      if (previousState < numberOfPages * 4) {
        paginationContainer.setAttribute(
          "data-status",
          (previousState + 4).toString()
        );

        const counter = +paginationContainer.getAttribute("data-status");

        renderResearchersProfiles(normalResearchers, counter);
        renderPaginationStatus(counter, normalResearchers.length);
      }
    });

    // Previous button click event
    previous.addEventListener("click", (event) => {
      const previousState = +paginationContainer.getAttribute("data-status");

      if (previousState > 0) {
        paginationContainer.setAttribute(
          "data-status",
          (previousState - 4).toString()
        );

        const counter = +paginationContainer.getAttribute("data-status");

        renderResearchersProfiles(normalResearchers, counter);
        renderPaginationStatus(counter, normalResearchers.length);
      }
    });
  } catch (err) {
    const error = new Error(err);
    console.log(error);
  }

  /**
   * @description Update the paginations status
   * @param {Number} currentStatus
   * @param {Number} researchersQuantity
   */
  function renderPaginationStatus(currentStatus, researchersQuantity) {
    const paginationStatus = doc.querySelector(".pagination-status");

    const currentPage = currentStatus / 4 + 1;

    const pagsNumber = Math.ceil(researchersQuantity / 4);

    const status = `${currentPage}/${pagsNumber}`;

    paginationStatus.innerHTML = status;
  }

  /**
   * @description Iterates over the array from the given number and renders each one of the objects
   * @param { Array } researchers
   * @param { Number } counter
   */
  function renderResearchersProfiles(researchers, counter) {
    // Cards container
    const researchersCardsContainer = doc.querySelector(
      ".researchers-cards-container"
    );

    // Borrando todos las cartas para poder renderizar las nuevas
    removeAllChildNodes(researchersCardsContainer);

    researchers.map((researcher, index) => {
      if (index >= counter && index < counter + 4) {
        const researcherCard = renderResearcherProfile(researcher);
        researchersCardsContainer.innerHTML += researcherCard; // injectando el 'HTML' creado
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
})(document);

// Random rendering
(function () {
  const CONTINENTS = ["America", "Europe", "Asia", "Oceania", "Africa"];

  const continentsBtns = document.querySelector(".continents-btns-container");
  const countriesBtns = document.querySelector(".countries-btns-container");

  const generateRandom = (minLimit, maxLimit) =>
    Math.floor(Math.random() * (maxLimit - minLimit) + minLimit); // Random between min and max limit

  renderRandomProjects(continentsBtns, countriesBtns);

  function renderRandomProjects(continentsBtns, countriesBtns) {
    const randIndexContinent = generateRandom(0, 5); // Random between 0 and the number of continents

    fetch("https://geo-energy-api.herokuapp.com/continents")
      .then((response) => response.json())
      .then(({ continents }) => {
        const randomContinent =
          continents[randIndexContinent][CONTINENTS[randIndexContinent]];
        const numberOfCountries = randomContinent.length;

        // Setting the state of the button to active (basically painting it :D)
        continentsBtns.children[randIndexContinent].style.backgroundColor =
          "#DF8543";
        renderSelectedContinentButtons(randomContinent);

        const randIndexCountry = generateRandom(0, numberOfCountries);

        fetch("https://geo-energy-api.herokuapp.com/institutions")
          .then((response) => response.json())
          .then(({ projects }) => {
            const randomCountry = countriesBtns.children[randIndexCountry];

            const countryId = randomCountry.classList[0];
            // Filtramos los proyectos por país seleccionado
            const projectsByCountryId = projects.filter(
              (project) => project.countryId === countryId
            );

            // Color activo, cuando se hace click
            randomCountry.style.backgroundColor = "#DF8543";
            renderSelectedCountryCards(projectsByCountryId);
          });
      });
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
                  <img src="${project.logo}" alt="${project.name}" class="logo"></img>
                </div>
                <div class="col-10">
                  <a href="${project.website}" target="_blank">
                    <h5 class="card-title ml-2">${project.name}</h5>
                  </a>
                </div>
              </div>
              <div class="card-notch"></div>
            </div>
          </div>
        </div>`;
}
