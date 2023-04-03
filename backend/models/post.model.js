const mongoose = require("mongoose");

//permet de créer le schema de ce à quoi vont ressembler les BDD
const postSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    likers: {
      type: [String]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('post', postSchema);