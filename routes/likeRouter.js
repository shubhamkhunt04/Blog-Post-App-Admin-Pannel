const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


// importing pagination middelware
const paginatedResult = require('../pagination');

const Likes = require("../models/likes");


const likes = express.Router();

likes.use(bodyParser.json());

likes.route('/').get(paginatedResult(Likes), (req, res, next) => {
    res.json(res.json);
});

module.exports = likes;