// Import the Coin model to enable interactions with the 'coins' collection in the database.
const Coin = require("../models/coinModel");

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

// Placeholder for a function to retrieve all coins from the database.
const getAllCoins = async (request, response) => {
  const coins = await Coin.find({}).sort({ createdAt: -1 });
  response.status(200).json(coins)
};

// Placeholder for a function to retrieve a single coin by its ID.
// const getCoin = async (request, response) => {};

// Placeholder for a function to delete a coin by its ID.
// const deleteCoin = async (request, response) => {};

// Placeholder for a function to update an existing coin's details by its ID.
// const updateCoin = async (request, response) => {};

// By exporting `createCoin`, we make it available for import using `require` in other parts of our application.
module.exports = {
  createCoin,
  getAllCoins,
};
