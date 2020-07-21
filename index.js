const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");
const News = require("./src/news");
const continentsRouter = require("./src/routes/continents");
const institutionsRouter = require("./src/routes/institutions");
const researchersRouter = require("./src/routes/researchers");

const hostname = "localhost";
const PORT = process.env.PORT || 5000;

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-reqed-With, Content-Type, Accept"
  );
  next();
});

app.use("/continents", continentsRouter);
app.use("/institutions", institutionsRouter);
app.use("/researchers", researchersRouter);

app.get("/newsESP", (req, res) => {
  const baseUrl = "https://www.piensageotermia.com/";

  scrapeNewsFrom(baseUrl)
    .then((news) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(news);
    })
    .catch((err) => next(err));
});

app.get("/newsENG", (req, res) => {
  const baseUrl = "https://www.thinkgeoenergy.com/";

  scrapeNewsFrom(baseUrl)
    .then((news) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(news);
    })
    .catch((err) => next(err));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://${hostname}:${PORT}`);
});

function scrapeNewsFrom(baseUrl) {
  return new Promise((resolve, reject) => {
    request(baseUrl, (error, response, html) => {
      if (!error) {
        const newsArray = [];

        const $ = cheerio.load(html);

        const main = $(".main");
        const news = $(main.children()[1]);

        const masterNews = $(news.children()[0]);
        const masterNewsUrl = masterNews.find("a").attr("href");
        const masterThumbnailStr = masterNews.find("figure").attr("style");
        const masterThumbnail = masterThumbnailStr.slice(
          23,
          masterThumbnailStr.length - 3
        );
        const masterDate = masterNews.find(".article-meta").text();
        const masterCaption = masterNews
          .find(".caption")
          .text()
          .replace(/^\s+|\s+$|\s+(?=\s)/g, "");

        newsArray.push(
          new News(
            masterNewsUrl,
            true,
            masterThumbnail,
            masterDate,
            masterCaption
          )
        );

        const secondaryNews = $(news.children()[1]);
        $(secondaryNews.children()).map((index, element) => {
          let child = $(element);
          const newsUrl = child.find("a").attr("href");
          const thumbnailStr = child.find("figure").attr("style");
          const thumbnail = thumbnailStr.slice(23, thumbnailStr.length - 3);
          const date = child.find(".article-meta").text();
          const caption = child
            .find(".caption")
            .text()
            .replace(/^\s+|\s+$|\s+(?=\s)/g, "");

          newsArray.push(new News(newsUrl, false, thumbnail, date, caption));
        });

        resolve(newsArray);
      } else {
        console.log(new Error(`Error ${error}: ${error.statusCode}`));
        reject(error);
      }
    });
  });
}
