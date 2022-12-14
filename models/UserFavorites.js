const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userFavoriteSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  anime_id: {
    type: Number,
    required: true,
  },
});

const userFavorites = mongoose.model("userFavorite", userFavoriteSchema);

module.exports = userFavorites;
