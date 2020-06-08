const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// importing pagination middelware
const paginatedResult = require('../pagination');

const Comments = require("../models/comments");


const comments = express.Router();

comments.use(bodyParser.json());

comments.route('/').get(paginatedResult(Comments), (req, res, next) => {
  res.json(res.json);
});

module.exports = comments;