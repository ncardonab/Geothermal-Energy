const express = require("express");
const photosRouter = express.Router();
const photos = require("../shared/photos.json");

photosRouter.route("/").get((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(photos);
});

module.exports = photosRouter;
