const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    text: {
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

var Comments = mongoose.model('Comment', commentsSchema);

module.exports = Comments;