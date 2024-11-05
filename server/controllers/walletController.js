// Import the Wallet model to interact with the MongoDB 'wallets' collection.
const Wallet = require("../models/walletModel");
// Import Mongoose for MongoDB object modeling.
const mongoose = require("mongoose");

/**
 * Creates a new wallet document in the database.
 *
 * @param {Object} request - The HTTP request object, containing wallet data in the body.
 * @param {Object} response - The HTTP response object used to return data or errors.
 */
const createWallet = async (request, response) => {
  const { userId } = request.body;

  try {
    const wallet = await Wallet.create({
      _id: userId, // Set the wallet ID to the user ID
      assets: [],
      depositMoney: 0,
    });
    response.status(201).json(wallet);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

/**
 * Retrieves and returns all wallet documents from the database.
 *
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object for returning data or errors.
 */
const getAllWallets = async (request, response) => {
  try {
    const wallets = await Wallet.find({}); // Corrected variable name
    response.status(200).json(wallets);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves a single wallet document by its associated user's ID.
 *
 * @param {Object} request - The HTTP request object, including the user ID in the params.
 * @param {Object} response - The HTTP response object for returning the wallet document or errors.
 */
const getWalletByUserId = async (request, response) => {
  const userId = request.params.userId;
  try {
    const wallet = await Wallet.findOne({ id: userId });
    if (!wallet) {
      return response.status(404).json({ error: "Wallet not found" });
    }
    response.status(200).json(wallet);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

/**
 * Updates an existing wallet document with new data provided in the request body.
 *
 * @param {Object} request - The HTTP request object, including the wallet ID in the params and update data in the body.
 * @param {Object} response - The HTTP response object for returning the updated document or errors.
 */
const updateWallet = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid wallet ID" });
  }

  try {
    const wallet = await Wallet.findByIdAndUpdate(
      id,
      { ...request.body },
      { new: true } // Ensure updated document is returned
    );
    if (!wallet) {
      return response.status(404).json({ error: "Wallet not found" });
    }
    response.status(200).json(wallet);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

/**
 * Deletes a wallet document using its unique ID.
 *
 * @param {Object} request - The HTTP request object, including the wallet ID in the params.
 * @param {Object} response - The HTTP response object for confirming deletion or reporting errors.
 */
const deleteWallet = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid wallet ID" });
  }

  try {
    const wallet = await Wallet.findByIdAndDelete(id);
    if (!wallet) {
      return response.status(404).json({ error: "Wallet not found" });
    }
    response.status(200).json({ message: "Wallet successfully deleted" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Export the wallet controller functions to be used in Express route definitions.
module.exports = {
  createWallet,
  getAllWallets,
  getWalletByUserId,
  updateWallet,
  deleteWallet,
};
