const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// importing pagination middelware
const paginatedResult = require('../pagination');

const Authors = require("../models/authors");

const authors = express.Router();

authors.use(bodyParser.json());

authors.route("/").get(paginatedResult(Authors), (req, res, next) => {
  res.json(res.json);
});

//Sort by Number of Posts
authors.route("/posts").get(paginatedResult(Authors, true, {
  numPosts: 1
}), (req, res, next) => {
  res.json(res.json);
});


//Sort by Number of Comments
authors.route("/comments").get(paginatedResult(Authors, true, {
  numComments: 1
}), (req, res, next) => {
  res.json(res.json);
});


//Sort by Number of Likes
authors.route("/likes").get(paginatedResult(Authors, true, {
  numLikes: 1
}), (req, res, next) => {
  res.json(res.json);
});

module.exports = authors;