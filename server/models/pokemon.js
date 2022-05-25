const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema of each stat of the Pokemon
const pokemonStatsSchema = new Schema({
  stat: {
    type: String,
  },
  value: {
    type: Number,
  },
});

// Pokemon DB Scheema
const pokemonSchema = new Schema(
  {
    name: {
      type: String,
    },
    id: {
      type: Number,
    },
    image: {
      type: String,
    },
    jp_name: {
      type: String,
    },
    types: [{
      type: String,
    }],
    stats: [pokemonStatsSchema],
  },
  {collection: 'pokemons'}
);

const Pokemon = mongoose.models.Pokemon || mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;
