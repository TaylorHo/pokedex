// ------------------ Express Config --------------------
const express = require("express");
const router = express.Router();
// ------------------------------------------------------


// ---------------- Route Controllers -------------------
let {
  getAllPokemons,
  getPokemonById,
  getMultiplePokemonsById
} = require('../controllers/pokemonController');
// ------------------------------------------------------



// ==================== ROUTES ==========================

// ------------------- /pokemon/ ------------------------
/**
 * @swagger
 * /pokemon:
 *   get:
 *     summary: Get a list of Pokemons
 *     description: Get a list of Pokemons
 *     responses:
 *       200:
 *         description: Return the Pokemon list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success on query or not (with HTTP status 200 it will always be "true")
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Name of the Pokemon
 *                       id:
 *                         type: integer
 *                         description: The Pokedex ID of the Pokemon
 *                       image:
 *                         type: string
 *                         description: URL of the Pokemon main image
 *                       types:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Array of the pokemon types
 *       503:
 *         description: MongoDB throws an error on select
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success on query or not (with HTTP status 503 it will always be "false")
 *                 message:
 *                   type: string
 *                   description: Explanation Message
 *                   default: "Mongo Select Error"
 *                 error_code:
 *                   type: string
 *                   description: Error Code to be used on the Front End
 *                   default: "mongo_error"
 *     parameters:
 *       - in: query
 *         name: s
 *         required: false
 *         type: string
 *         description: The Pokemon name or ID to search
 *       - in: query
 *         name: page
 *         required: false
 *         type: integer
 *         default: 1
 *         description: Page to use as pagination (with limit parameter, see below)
 *       - in: query
 *         name: limit
 *         required: false
 *         type: integer
 *         default: 20
 *         description: The limit of results that will be returned
 */
router.get('/', async (req, res) => {
  let response = await getAllPokemons(
    req.query.s,
    req.query.page,
    req.query.limit
  );
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    // error in mongo select
    res.status(503).json(response);
  }
})
// ------------------------------------------------------


// ------------- /pokemon/single/:id --------------------
/**
 * @swagger
 * /pokemon/single/{id}:
 *   get:
 *     summary: Get a single Pokemon by his ID
 *     description: Get a single Pokemon by his ID
 *     responses:
 *       200:
 *         description: Return the Pokemon info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success on query or not (with HTTP status 200 it will always be "true")
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Name of the Pokemon
 *                     id:
 *                       type: integer
 *                       description: The Pokedex ID of the Pokemon
 *                     image:
 *                       type: string
 *                       description: URL of the Pokemon main image
 *                     types:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Array of the pokemon types
 *                     stats:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           stat:
 *                             type: string
 *                           value:
 *                             type: integer
 *                       description: Array of the pokemon stats
 *                     jp_name:
 *                       type: string
 *                       description: Name of the Pokemon in Japanese
 *       404:
 *         description: Pokemon not found (invalid ID)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success on query or not (with HTTP status 404 it will always be "false")
 *                 message:
 *                   type: string
 *                   description: Explanation Message
 *                   default: "Pokemon ID Not Found"
 *                 error_code:
 *                   type: string
 *                   description: Error Code to be used on the Front End
 *                   default: "not_found"
 *       503:
 *         description: MongoDB throws an error on select
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success on query or not (with HTTP status 503 it will always be "false")
 *                 message:
 *                   type: string
 *                   description: Explanation Message
 *                   default: "Mongo Select Error"
 *                 error_code:
 *                   type: string
 *                   description: Error Code to be used on the Front End
 *                   default: "mongo_error"
 *       500:
 *         description: Unhandled error (the least common, because all possible errors are handled)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success on query or not (with HTTP status 500 it will always be "false")
 *                 message:
 *                   type: string
 *                   description: Explanation Message
 *                   default: "Unhandled Server/API Error"
 *                 error_code:
 *                   type: string
 *                   description: Error Code to be used on the Front End
 *                   default: "unhandled_error"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: The Pokemon ID to search
 */
router.get("/single/:id", async (req, res) => {
  let response = await getPokemonById(req.params.id);
  if (response.success == true) {
    res.status(200).json(response);
  } else {

    switch (response.error_code) {
      case "not_found":
        res.status(404).json(response);
        break;
      case "mongo_error":
        res.status(503).json(response);
        break;
      default:
        res.status(500).json({
          success: false,
          message: "Unhandled Server/API Error",
          error_code: "unhandled_error"
        });
        break;
    }

  }
});
// ------------------------------------------------------


// ------------ /pokemon/multiple/:ids ------------------
/**
 * @swagger
 * /pokemon/multiple/{ids}:
 *   get:
 *     summary: Get an array of Pokemons based on they pokedex IDs
 *     description: Get an array of Pokemons based on they pokedex IDs
 *     responses:
 *       200:
 *         description: Return the Pokemon list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success on query or not (with HTTP status 200 it will always be "true")
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Name of the Pokemon
 *                       id:
 *                         type: integer
 *                         description: The Pokedex ID of the Pokemon
 *                       image:
 *                         type: string
 *                         description: URL of the Pokemon main image
 *                       types:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Array of the pokemon types
 *       404:
 *         description: Pokemon not found (invalid ID)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success on query or not (with HTTP status 404 it will always be "false")
 *                 message:
 *                   type: string
 *                   description: Explanation Message
 *                   default: "Pokemons Not Found"
 *                 error_code:
 *                   type: string
 *                   description: Error Code to be used on the Front End
 *                   default: "not_found"
 *       503:
 *         description: MongoDB throws an error on select
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success on query or not (with HTTP status 503 it will always be "false")
 *                 message:
 *                   type: string
 *                   description: Explanation Message
 *                   default: "Mongo Select Error"
 *                 error_code:
 *                   type: string
 *                   description: Error Code to be used on the Front End
 *                   default: "mongo_error"
 *       500:
 *         description: Unhandled error (the least common, because all possible errors are handled)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success on query or not (with HTTP status 500 it will always be "false")
 *                 message:
 *                   type: string
 *                   description: Explanation Message
 *                   default: "Unhandled Server/API Error"
 *                 error_code:
 *                   type: string
 *                   description: Error Code to be used on the Front End
 *                   default: "unhandled_error"
 *     parameters:
 *       - in: path
 *         name: ids
 *         required: true
 *         type: array
 *         items:
 *           type: Number
 *         description: An Array of the Pokemon IDs to select
 */
 router.get('/multiple/:ids', async (req, res) => {
  let response = await getMultiplePokemonsById(req.params.ids);

  if (response.success == true) {
    res.status(200).json(response);
  } else {

    switch (response.error_code) {
      case "not_found":
        res.status(404).json(response);
        break;
      case "syntax_error":
        res.status(400).json(response);
        break;
      case "mongo_error":
        res.status(503).json(response);
        break;
      default:
        res.status(500).json({
          success: false,
          message: "Unhandled Server/API Error",
          error_code: "unhandled_error"
        });
        break;
    }

  }
})
// ------------------------------------------------------



module.exports = router;