const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorsSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  firtsname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  numPosts: {
    type: Number,
    required: true,
  },
  numComments: {
    type: Number,
    required: true,
  },
  numLikes: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

var Authors = mongoose.model("Author", authorsSchema);

module.exports = Authors;