// Import Express for building the server and defining API routes.
const express = require("express");

// Import controller functions for handling CRUD operations on coins.
const {
  createCoin,
  getAllCoins,
  getCoin,
  deleteCoin,
  updateCoin,
} = require("../controllers/coinController");

// Initialize an Express router to define routes for handling requests related to 'coins'.
const router = express.Router();

// Route for retrieving all coins. Uses the 'getAllCoins' controller to handle the request.
router.get("/", getAllCoins);

// Route for retrieving a single coin by ID. Uses the 'getCoin' controller to handle the request.
router.get("/:id", getCoin);

// Route for adding a new coin. Uses the 'createCoin' controller to handle the request.
router.post("/", createCoin);

// Route for removing a coin by ID. Uses the 'deleteCoin' controller to handle the request.
router.delete("/:id", deleteCoin);

// Route for updating a coin by ID. Uses the 'updateCoin' controller to handle the request.
router.patch("/:id", updateCoin);

// Export the router to integrate it into the Express application.
module.exports = router;
