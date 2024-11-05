// Import the Coin model to interact with the MongoDB 'coins' collection.
const Coin = require("../models/coinModel");
// Import Mongoose for MongoDB object modelling and to utilize its schema validation and ObjectId.
const mongoose = require("mongoose");

/**
 * Creates a new coin document in the database.
 *
 * @param {Object} request - The HTTP request object, containing coin data in the body.
 * @param {Object} response - The HTTP response object used to return data or errors.
 */
const createCoin = async (request, response) => {
  const {
    id,
    symbol,
    name,
    supply,
    maxSupply,
    marketCapUsd,
    volumeUsd24Hr,
    priceUsd,
    changePercent24Hr,
    vwap24Hr,
    explorer,
  } = request.body;
  let emptyFields = [];

  if (!id) {
    emptyFields.push("id");
  }
  if (!symbol) {
    emptyFields.push("symbol");
  }
  if (!name) {
    emptyFields.push("name");
  }

  // Add additional fields to check as necessary
  if (emptyFields.length > 0) {
    return response.status(400).json({
      error:
        "Please fill in all of the required fields: " + emptyFields.join(", "),
    });
  }
  try {
    const coin = await Coin.create({
      id,
      symbol,
      name,
      supply,
      maxSupply,
      marketCapUsd,
      volumeUsd24Hr,
      priceUsd,
      changePercent24Hr,
      vwap24Hr,
      explorer,
    });
    response.status(201).json(coin);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

/**
 * Retrieves and returns all coin documents from the database, sorted by creation date.
 *
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object for returning data or errors.
 */
const getAllCoins = async (request, response) => {
  const coins = await Coin.find({});
  response.status(200).json(coins);
};

/**
 * Retrieves a single coin document by its unique ID.
 *
 * @param {Object} request - The HTTP request object, including the coin ID in the params.
 * @param {Object} response - The HTTP response object for returning the coin document or errors.
 */
const getCoin = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No valid coin ID provided" });
  }

  const coin = await Coin.findById(id);

  if (!coin) {
    return response.status(404).json({ error: "Coin not found" });
  }

  response.status(200).json(coin);
};

/**
 * Deletes a coin document using its unique ID.
 *
 * @param {Object} request - The HTTP request object, including the coin ID in the params.
 * @param {Object} response - The HTTP response object for confirming deletion or reporting errors.
 */
const deleteCoin = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid coin ID" });
  }

  const result = await Coin.findOneAndDelete({ _id: id });

  if (!result) {
    return response.status(404).json({ error: "Coin not found for deletion" });
  }

  response.status(200).json({ message: "Coin deleted successfully" });
};

/**
 * Updates an existing coin document with new data provided in the request body.
 *
 * @param {Object} request - The HTTP request object, including the coin ID in the params and update data in the body.
 * @param {Object} response - The HTTP response object for returning the updated document or errors.
 */
const updateCoin = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid coin ID for update" });
  }

  const coin = await Coin.findOneAndUpdate(
    { _id: id },
    { ...request.body },
    { new: true } // Option to return the document after update.
  );

  if (!coin) {
    return response.status(404).json({ error: "Coin not found for update" });
  }

  response.status(200).json(coin);
};

// Export the controller functions to be used in Express route definitions.
module.exports = {
  createCoin,
  getAllCoins,
  getCoin,
  deleteCoin,
  updateCoin,
};
