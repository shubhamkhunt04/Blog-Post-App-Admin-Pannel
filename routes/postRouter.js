const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


// importing pagination middelware
const paginatedResult = require('../pagination');

const Posts = require("../models/posts");

const posts = express.Router();

posts.use(bodyParser.json());

posts.route('/').get(paginatedResult(Posts), (req, res, next) => {
    res.json(res.json);
});



// Sort Post List By Comments
posts.route('/comments').get(paginatedResult(Posts, true, {
    numComments: 1
}), (req, res, next) => {
    res.json(res.json);
});


// Sort Post List By Likes

posts.route('/likes').get(paginatedResult(Posts, true, {
    numLikes: 1
}), (req, res, next) => {
    res.json(res.json);
});



// Last 12 Hour Post
posts.route('/:times')
    .get((req, res, next) => {

        let totalMiliSecond;

        if (req.params.times === "last12hrs") {
            totalMiliSecond = 43200000;
            postFilter(totalMiliSecond);
        } else if (req.params.times === "lastday") {
            totalMiliSecond = 86400000;
            postFilter(totalMiliSecond);
        } else if (req.params.times === "last3days") {
            totalMiliSecond = 259200000;
            postFilter(totalMiliSecond);
        } else if (req.params.times === "lastweek") {
            totalMiliSecond = 604800000;
            postFilter(totalMiliSecond);
        } else if (req.params.times === "lastmonth") {
            totalMiliSecond = 2592000000;
            postFilter(totalMiliSecond);
        } else {
            // Extracting starting date and ending date from URL
            let date = req.params.times.split('and');
            let startDate = date[0].split('-').join('/')
            let endDate = date[1].split('-').join('/')

            startingDate = new Date(startDate).getTime(); // storing time in milisecond
            endingDate = new Date(endDate).getTime();

            Posts.find({
                    datePublished: {
                        $lte: endingDate,
                        $gte: startingDate
                    }
                })
                .then((posts) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(posts);
                }, (err) => next(err))
                .catch((err) => next(err));
        }

        function postFilter(totalMiliSeconds) {
            Posts.find({
                    datePublished: {
                        $lte: Date.now(),
                        $gte: Date.now() - totalMiliSecond
                    }
                })
                .then((posts) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(posts);
                }, (err) => next(err))
                .catch((err) => next(err));
        }
    })


module.exports = posts;