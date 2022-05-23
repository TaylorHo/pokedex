const Pokemon = require('../models/pokemon');


async function getAllPokemons(search, reqPage, reqLimit) {
  let options = {};

  if (search) {
    options = {
      name: new RegExp(search.toString(), "i")
    };
  }

  let page = parseInt(reqPage) || 1; // first page, if not specified
  let limit = parseInt(reqLimit) || 20; // max 20 results, if not specified

  try {
    const pokemons = await Pokemon.find(options)
      .select("-_id -stats -jp_name")
      .skip((page - 1) * limit)
      .limit(limit);
    
    return {
      success: true,
      data: pokemons,
    };

  } catch (err) {
    return { success: false, message: "Mongo Select Error", error_code: "mongo_error" };
  }
}

async function getPokemonById(id) {
  let pokemon;
  try {
    pokemon = await Pokemon.findOne({ id: id }).select("-_id");
    if (pokemon == null) {
      return { success: false, message: "Pokemon ID not found", error_code: "not_found" };
    }
  } catch (err) {
    return { success: false, message: "Mongo Select Error", error_code: "mongo_error" };
  }

  return {
    success: true,
    data: pokemon,
  };
}

module.exports = {
  getAllPokemons,
  getPokemonById,
};