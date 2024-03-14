// Import the Coin model to interact with the 'coins' collection in the MongoDB database.
const Coin = require("../models/coinModel");
// Import Mongoose for MongoDB interaction, specifically to validate MongoDB ObjectIds.
const mongoose = require("mongoose");

/**
 * Asynchronously creates a new coin document in the database.
 *
 * @param {Object} request - The HTTP request object containing the coin data.
 * @param {Object} response - The HTTP response object for sending back the created coin or an error message.
 */
const createCoin = async (request, response) => {
  const { name, currentPrice } = request.body;

  try {
    const coin = await Coin.create({ name, currentPrice });
    response.status(200).json(coin);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

/**
 * Asynchronously retrieves all coins from the database, sorted by creation date in descending order.
 *
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object for sending back the list of coins or an error message.
 */
const getAllCoins = async (request, response) => {
  const coins = await Coin.find({}).sort({ createdAt: -1 });
  response.status(200).json(coins);
};

/**
 * Asynchronously retrieves a single coin by its unique ID.
 *
 * @param {Object} request - The HTTP request object, including the coin's ID in the URL parameters.
 * @param {Object} response - The HTTP response object for sending back the found coin or an error message.
 */
const getCoin = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid id check for coin" });
  }

  const coin = await Coin.findById(id);

  if (!coin) {
    return response.status(404).json({ error: "Can't find the coin" });
  }

  response.status(200).json(coin);
};

/**
 * Asynchronously deletes a coin from the database using its unique ID.
 *
 * @param {Object} request - The HTTP request object, including the coin's ID.
 * @param {Object} response - The HTTP response object for confirming deletion or reporting errors.
 */
const deleteCoin = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid ID for coin (Delete)" });
  }

  const coin = await Coin.findOneAndDelete({ _id: id });

  if (!coin) {
    return response.status(404).json({ error: "Couldn't find the coin" });
  }

  response.status(200).json(coin);
};

/**
 * Asynchronously updates a coin's details in the database using its unique ID.
 *
 * @param {Object} request - The HTTP request object, including the coin's ID and the new data for update.
 * @param {Object} response - The HTTP response object for sending back the updated coin or an error message.
 */
const updateCoin = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid ID for coin (Update)" });
  }

  const coin = await Coin.findOneAndUpdate(
    { _id: id },
    { ...request.body },
    { new: true } // Option to return the updated document.
  );

  if (!coin) {
    return response.status(404).json({ error: "Couldn't find the coin" });
  }

  response.status(200).json(coin);
};

// Export the controller functions to make them accessible to the router for handling API requests.
module.exports = {
  createCoin,
  getAllCoins,
  getCoin,
  deleteCoin,
  updateCoin,
};
