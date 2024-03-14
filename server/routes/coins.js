// Import the Express framework to utilize its routing capabilities.
const express = require("express");

// Import CRUD operation handlers for coins from the coinController module.
const {
  createCoin,
  getAllCoins,
  getCoin,
  deleteCoin,
  updateCoin,
} = require("../controllers/coinController");

// Initialize a new Express router to define and manage API routes under a common path (e.g., '/api/coins').
const router = express.Router();

// Define a route for fetching all coins. When a GET request is made to '/api/coins', it triggers the getAllCoins function.
router.get("/", getAllCoins);

// Define a route for fetching a single coin by ID. The getCoin function is triggered by a GET request to '/api/coins/:id'.
router.get("/:id", getCoin);

// Define a route for creating a new coin. The createCoin function handles POST requests to '/api/coins', using the request body to create a coin.
router.post("/", createCoin);

// Define a route for deleting a coin by ID. DELETE requests to '/api/coins/:id' trigger the deleteCoin function to remove the specified coin.
router.delete("/:id", deleteCoin);

// Define a route for partially updating a coin's details. PATCH requests to '/api/coins/:id' are handled by the updateCoin function for partial updates.
router.patch("/:id", updateCoin);

// Export the router so it can be integrated into the main server setup, making the routes available as part of the application's API.
module.exports = router;
