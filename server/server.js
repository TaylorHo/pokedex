// --------------- Imports and Requires -----------------
const express      = require('express');
const cors         = require('cors');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi    = require("swagger-ui-express");
const { pokemons } = require("./routes/index");
const dbConnect    = require("./config/db");
const app          = express();
const port         = process.env.PORT || 3000;
// ------------------------------------------------------


// ------------------ Express Config --------------------
app.use(express.json());
app.use(cors());
// ------------------------------------------------------


// ------------------ Start Database --------------------
dbConnect();
// ------------------------------------------------------


// ------------------ Swagger Config --------------------
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Pokemons REST API - CERTI Challenge",
      description:
        "API to get Pokemons info from the MongoDB database. Was created to the CERTI Challenge for Fullstack Developer by Taylor Hoffmann.",
      license: {
        name: "MIT",
        url: "https://github.com/TaylorHo/pokedex/blob/master/LICENSE"
      }
    },
    basePath: "/api/",
  },
  apis: [
    "./routes/pokemons.js",
  ],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(
  "/api-docs/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
);
// ------------------------------------------------------


// -------------------- API Routes ----------------------
app.use("/api/pokemon", pokemons);
app.use("/api/", (req, res) => {
  res.status(200).json({message: "To use the Pokemon API go to /api/pokemon/ or read the docs at /api-docs/"});
});
// ------------------------------------------------------


// ---------------- Serve the Front-End -----------------
app.use('/', express.static(`${__dirname}/web/`));
app.get('/*', async (req, res) => {
  res.sendFile(`${__dirname}/web/index.html`);
});
// ------------------------------------------------------


// ------------------ Server Listening ------------------
app.listen(port, () => {
  console.log(`Server up in http://localhost:${port}`);
});
// ------------------------------------------------------
