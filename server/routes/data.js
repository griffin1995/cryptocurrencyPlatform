// Import the express module to use its functionalities for creating a server and defining routes.
const express = require("express");
// Import the Coin model, which we'll use to interact with the 'coins' collection in the database.
const Coin = require("../models/coinModel");

// Create a new Express router to handle requests related to 'coins'.
const router = express.Router();

// Define a GET route for fetching all coin data.
router.get("/", (request, response) => {
  // This is a placeholder response. In a real app, you would query the database here.
  response.json({ mssg: "GET all data" });
});

// Define a GET route for fetching a single coin by its ID.
router.get("/:id", (request, response) => {
  // This is a placeholder response. You would typically find a coin by its ID here.
  response.json({ mssg: "GET single data" });
});

// Route to create a new coin entry in the database.
router.post("/", async (request, response) => {
  // Extract 'title' and 'value' from the incoming request's body.
  const { title, value } = request.body;

  try {
    // Create a new coin using the Coin model. Pass in an object with 'title' and 'value'.
    // The 'Coin.create' method automatically saves the new document to the database.
    const coin = await Coin.create({ title, value });

    // If the coin is successfully created and saved, send it back in the response with a 200 OK status.
    response.status(200).json(coin);
  } catch (error) {
    // If an error occurs (e.g., a required field is missing or a database error), catch it
    // and send back an error message with a 400 Bad Request status.
    response.status(400).json({ error: error.message });
  }
});

// Define a DELETE route for removing a coin by its ID.
router.delete("/:id", (request, response) => {
  // Placeholder response. You'd typically delete a coin by its ID here.
  response.json({ mssg: "DELETE data" });
});

// Define a PATCH route for partially updating a coin's information by its ID.
router.patch("/:id", (request, response) => {
  // Placeholder response. Actual update logic would go here.
  response.json({ mssg: "UPDATE data" });
});

// Export the router so it can be used in the main server file, linking these routes under a specific path.
module.exports = router;
