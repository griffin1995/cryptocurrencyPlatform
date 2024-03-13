// Import the Coin model to enable interactions with the 'coins' collection in the database.
const Coin = require("../models/coinModel");
// Import mongoose for MongoDB object modeling and to utilize its utilities, such as validating object IDs.
const mongoose = require("mongoose");

// Function to create a new coin entry in the database.
const createCoin = async (request, response) => {
  // Extract 'name' and 'value' from the request body.
  const { name, value } = request.body;

  try {
    // Attempt to create and save a new coin document using the provided 'name' and 'value'.
    const coin = await Coin.create({ name, value });
    // If successful, respond with the newly created coin document and a 200 OK status.
    response.status(200).json(coin);
  } catch (error) {
    // If an error occurs (e.g., validation failure), respond with the error message and a 400 Bad Request status.
    response.status(400).json({ error: error.message });
  }
};

// Function to retrieve all coins from the database.
const getAllCoins = async (request, response) => {
  // Fetch all coins from the database and sort them by creation date in descending order.
  const coins = await Coin.find({}).sort({ createdAt: -1 });
  response.status(200).json(coins); // Respond with the fetched coins.
};

// Function to retrieve a single coin by its ID.
const getCoin = async (request, response) => {
  const { id } = request.params; // Extract the coin's ID from the request parameters.

  // Check if the provided ID is valid for a MongoDB ObjectID.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // If the ID is not valid, respond with a 404 status and an error message.
    return response.status(404).json({ error: "Invalid id check for coin" });
  }
  const coin = await Coin.findById(id); // Find the coin by its ID in the database.

  if (!coin) {
    // If no coin is found with the provided ID, respond with a 404 status and an error message.
    return response.status(404).json({ error: "Can't find the coin" });
  }

  response.status(200).json(coin); // If a coin is found, respond with it.
};

// Exports the functions for use in other parts of the application, making them accessible for routing.
module.exports = {
  createCoin,
  getAllCoins,
  getCoin,
};
