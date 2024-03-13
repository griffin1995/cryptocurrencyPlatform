// Imports the Coin model for database interactions with the 'coins' collection.
const Coin = require("../models/coinModel");
// Imports mongoose to work with MongoDB and utilize its utilities, such as ID validation.
const mongoose = require("mongoose");

// Creates a new coin entry in the database from request data.
const createCoin = async (request, response) => {
  const { name, value } = request.body; // Extracts 'name' and 'value' from the request.

  try {
    const coin = await Coin.create({ name, value }); // Saves new coin to the database.
    response.status(200).json(coin); // Responds with the created coin if successful.
  } catch (error) {
    response.status(400).json({ error: error.message }); // Handles and responds to errors.
  }
};

// Retrieves all coins from the database, sorted by their creation date.
const getAllCoins = async (request, response) => {
  const coins = await Coin.find({}).sort({ createdAt: -1 }); // Fetches and sorts coins.
  response.status(200).json(coins); // Responds with the list of all coins.
};

// Retrieves a specific coin by its ID.
const getCoin = async (request, response) => {
  const { id } = request.params; // Extracts the coin's ID from the request.

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid id check for coin" }); // Validates the ID.
  }
  const coin = await Coin.findById(id); // Finds the coin by ID.

  if (!coin) {
    return response.status(404).json({ error: "Can't find the coin" }); // Handles coin not found.
  }

  response.status(200).json(coin); // Responds with the found coin.
};

// Deletes a coin by its ID from the database.
const deleteCoin = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid ID for coin (Delete)" }); // Validates the ID.
  }
  const coin = await Coin.findOneAndDelete({ _id: id }); // Attempts to find and delete the coin.

  if (!coin) {
    return response.status(404).json({ error: "Couldn't find the coin" }); // Handles coin not found.
  }

  response.status(200).json({ coin }); // Responds with the deleted coin.
};

// Updates a coin's information by its ID.
const updateCoin = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid ID for coin (Update)" }); // Validates the ID.
  }
  const coin = await Coin.findOneAndUpdate(
    { _id: id },
    { ...request.body },
    { new: true }
  ); // Finds and updates the coin.

  if (!coin) {
    return response.status(404).json({ error: "Couldn't find the coin" }); // Handles coin not found.
  }

  response.status(200).json(coin); // Responds with the updated coin.
};

// Exports functions for routing use, enabling CRUD operations on coins.
module.exports = {
  createCoin,
  getAllCoins,
  getCoin,
  deleteCoin,
  updateCoin,
};
