const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    authorId: {
        type: Number,
        required: true
    },
    datePublished: {
        type: Number,
        required: true
    },
    numComments: {
        type: Number,
        required: true
    },
    numLikes: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

var Posts = mongoose.model('Post', postsSchema);

module.exports = Posts;