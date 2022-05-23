// ------------------ Express Config --------------------
const express = require("express");
const router = express.Router();
// ------------------------------------------------------


// ---------------- Route Controllers -------------------
let {
  getAllPokemons,
  getPokemonById
} = require('../controllers/pokemonController');
// ------------------------------------------------------



// ==================== ROUTES ==========================

// ------------------- /pokemon/ ------------------------
/**
 * @swagger
 * /pokemon:
 *   get:
 *     summary: Get a list of Pokemons
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


// ----------------- /pokemon/:id -----------------------
/**
 * @swagger
 * /pokemon/{id}:
 *   get:
 *     summary: Get a single Pokemon by his ID
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: The Pokemon ID to search
 */
router.get("/:id", async (req, res) => {
  let response = await getPokemonById(req.params.id);
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    if (response.error_msg == "not_found") {
      res.status(404).json(response);
    } else if (response.error_msg == "mongo_error") {
      res.status(503).json(response);
    }
  }
});
// ------------------------------------------------------


module.exports = router;