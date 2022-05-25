const Pokemon = require('../models/pokemon');

// Select just the necessary data of the pokemons
// "search" defines a word/name to search, and if not specified return all
async function getAllPokemons(search, reqPage, reqLimit) {
  let options = {};

  if (search) {
    options = {
      name: new RegExp(search.toString(), "i")
    };
  }

  let page = parseInt(reqPage) || 1; // First page, if not specified
  let limit = parseInt(reqLimit) || 20; // Max 20 results, if not specified

  try {
    const pokemons = await Pokemon.find(options)
      .select("-_id -stats -jp_name")
      .skip((page - 1) * limit)
      .limit(limit);
    
    // Return selected data
    return {
      success: true,
      data: pokemons,
    };

  } catch (err) {
    // Error executing the query
    return { success: false, message: "Mongo Select Error", error_code: "mongo_error" };
  }
}

// Get a pokemon by his ID (get all his data)
async function getPokemonById(id) {
  let pokemon;
  try {
    pokemon = await Pokemon.findOne({ id: id }).select("-_id");
    if (pokemon == null) {
      // Inexistent ID
      return { success: false, message: "Pokemon ID not found", error_code: "not_found" };
    }
  } catch (err) {
    // Error executing the query
    return { success: false, message: "Mongo Select Error", error_code: "mongo_error" };
  }

  // Return the Pokemon data (because haven't encountered any type of problem)
  return {
    success: true,
    data: pokemon,
  };
}

// Like "getAllPokemons", but with selected IDs
async function getMultiplePokemonsById(ids) {
  let pokemons;

  try {
    ids = JSON.parse(ids);
  } catch (err) {
    // Isn't and array
    return { success: false, message: "An invalid array was passed", error_code: "syntax_error" };
  }

  // create the query with all the specified IDs
  const warkableIds = ids.map((singleID) => {
    return {
      id: parseInt(singleID)
    }
  });

  try {
    pokemons = await Pokemon.find({ $or: warkableIds }).select("-_id -stats -jp_name");
    if (pokemons == null) {
      // Inexistent IDs
      return { success: false, message: "Pokemons not found", error_code: "not_found" };
    }
  } catch (err) {
    // Error executing the query
    return { success: false, message: "Mongo Select Error", error_code: "mongo_error" };
  }

  // Return the Pokemon Data
  return {
    success: true,
    data: pokemons,
  };
}


module.exports = {
  getAllPokemons,
  getPokemonById,
  getMultiplePokemonsById,
};