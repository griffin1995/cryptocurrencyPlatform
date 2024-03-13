// Import Express for building the server and defining API routes.
const express = require("express");

// Import the 'createCoin' function from the coin controller for handling coin creation.
const {
  createCoin,
  getAllCoins,
  getCoin,
} = require("../controllers/coinController");

// Initialize an Express router to define routes for handling requests related to 'coins'.
const router = express.Router();

// Route for retrieving all coins. This is a placeholder for database query implementation.
router.get("/", getAllCoins);

// Route for retrieving a single coin by ID. Placeholder for database query implementation.
router.get("/:id", getCoin);

// Route for adding a new coin. Uses the 'createCoin' controller to handle the request.
router.post("/", createCoin);

// Route for removing a coin by ID. Placeholder for database deletion implementation.
router.delete("/:id", (request, response) => {
  response.json({ message: "DELETE coin placeholder" });
});

// Route for updating a coin by ID. Placeholder for database update implementation.
router.patch("/:id", (request, response) => {
  response.json({ message: "UPDATE coin placeholder" });
});

// Export the router to make it available for inclusion in the application's main server file.
module.exports = router;
