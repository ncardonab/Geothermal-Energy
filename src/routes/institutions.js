const express = require("express");
const institutionsRouter = express.Router();
const institutions = require("../involved_institutions.json");

institutionsRouter.route("/").get((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(institutions);
});

module.exports = institutionsRouter;
