// Import the Express module to set up the HTTP server and define API endpoints, facilitating the creation of RESTful web services.
const express = require("express");

// Import functions from the coinController module that handle coin-related actions.
// These actions include creating, listing, fetching specific coins, deleting, and updating coin information.
const {
  createCoin, // Function to create a new coin
  getAllCoins, // Function to retrieve all coins
  getCoin, // Function to retrieve a specific coin by ID
  deleteCoin, // Function to delete a specific coin by ID
  updateCoin, // Function to update a specific coin by ID
} = require("../controllers/coinController");

const requireAuth = require("../middleware/requireAuth");

// Initialize an Express Router to define and manage routes for coin-related operations.
const router = express.Router();

// Apply the authentication middleware to all routes in this router to ensure only authorized access.
router.use(requireAuth);

// Define a GET route for fetching a list of all coins.
router.get("/", getAllCoins);

// Define a GET route for fetching a single coin by their unique ID.
// The ':id' parameter in the URL path dynamically captures the coin's ID from the incoming request.
router.get("/:id", getCoin);

// Define a POST route for creating a new coin.
// This endpoint expects coin data in the request body, which the createCoin function from the controller processes.
router.post("/", createCoin);

// Define a DELETE route for removing a coin by their ID.
// This route utilizes the ':id' parameter to identify the coin to be deleted.
router.delete("/:id", deleteCoin);

// Define a PATCH route for updating partial information of a coin's record.
// The route identifies the coin by their ID and applies updates to specific fields as per the request body.
router.patch("/:id", updateCoin);

// Export the router object.
// This makes the defined routes available for integration into the application's main server configuration,
// thereby becoming part of the application's API.
module.exports = router;
