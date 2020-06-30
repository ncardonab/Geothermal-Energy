const express = require("express");
const continentsRouter = express.Router();
const continents = require("../continents.json");

continentsRouter.route("/").get((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(continents);
});

module.exports = continentsRouter;
