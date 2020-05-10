const express = require("express");
const cheerio = require("cheerio");
const download = require("node-image-downloader");
const request = require("request");
const News = require("./news");

const app = express();

app.get("/news", (req, res) => {
  const baseUrl = "http://www.piensageotermia.com/";

  getScrapedNews();
  async function getScrapedNews() {
    const news = await scrapeNewsFrom(baseUrl);
    res.json(news);
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Our BaaS is running on port ${port}`);
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
          new News(true, masterThumbnail, masterDate, masterCaption)
        );

        const secondaryNews = $(news.children()[1]);
        $(secondaryNews.children()).map((index, element) => {
          let child = $(element);
          const thumbnailStr = child.find("figure").attr("style");
          const thumbnail = thumbnailStr.slice(23, thumbnailStr.length - 3);
          const date = child.find(".article-meta").text();
          const caption = child
            .find(".caption")
            .text()
            .replace(/^\s+|\s+$|\s+(?=\s)/g, "");

          newsArray.push(new News(false, thumbnail, date, caption));
        });

        resolve(newsArray);
      } else {
        console.log(new Error(`Error ${error}: ${error.statusCode}`));
        reject(error);
      }
    });
  });
}
