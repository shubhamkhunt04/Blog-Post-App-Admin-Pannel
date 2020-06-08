const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likesSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    postId: {
        type: Number,
        required: true
    },
    authorId: {
        type: Number,
        required: true
    },
    datePublished: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

var Likes = mongoose.model('Like', likesSchema);

module.exports = Likes;