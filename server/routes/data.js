// Import Express for server and routing functionality.
const express = require("express");
// Import the Coin model for database interactions with the 'coins' collection.
const Coin = require("../models/coinModel");

// Create an Express router to handle 'coins' related requests.
const router = express.Router();

// GET route for retrieving all coins. Actual implementation will query the database.
router.get("/", (request, response) => {
  response.json({ mssg: "GET all data" }); // Placeholder response.
});

// GET route for a single coin by ID. Implementation will find the coin in the database.
router.get("/:id", (request, response) => {
  response.json({ mssg: "GET single data" }); // Placeholder response.
});

// POST route to add a new coin. Extracts data from request, creates and saves the coin.
router.post("/", async (request, response) => {
  const { name, value } = request.body; // Extract 'title' and 'value' from request.
  try {
    const coin = await Coin.create({ name, value }); // Create and save new coin.
    response.status(200).json(coin); // Send back the new coin with 200 OK.
  } catch (error) {
    response.status(400).json({ error: error.message }); // Handle errors, send 400 Bad Request.
  }
});

// DELETE route for removing a coin by ID. Actual implementation deletes the coin.
router.delete("/:id", (request, response) => {
  response.json({ mssg: "DELETE data" }); // Placeholder response.
});

// PATCH route for updating a coin by ID. Implementation will apply partial updates.
router.patch("/:id", (request, response) => {
  response.json({ mssg: "UPDATE data" }); // Placeholder response.
});

// Export the router for use in the main server file, associating these routes with a path.
module.exports = router;
