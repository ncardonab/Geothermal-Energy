const express = require("express");
const researchersRouter = express.Router();
const researchers = require("../shared/researchers.json");

researchersRouter.route("/").get((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(researchers);
});

module.exports = researchersRouter;
