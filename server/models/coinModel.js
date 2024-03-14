// Import the Mongoose library to interact with MongoDB.
const mongoose = require("mongoose");
// Import the Schema constructor from Mongoose to define the structure of database documents.
const Schema = mongoose.Schema;

/**
 * Defines the schema for the 'coins' collection in MongoDB.
 * This schema specifies the structure and data types of documents within the 'coins' collection.
 */
const coinSchema = new Schema(
  {
    // Defines a 'name' field as a string. This field is required and is expected to uniquely identify each coin.
    name: { type: String, required: true },
    // Defines a 'value' field to store the coin's intrinsic or initial value as a number. This field is also required.
    value: { type: Number, required: true },
    // Defines a 'publicKey' field, which is likely intended for use in cryptographic operations or verification.
    publicKey: { type: Number, required: true },
    // 'currentPrice' field stores the coin's current market value, allowing for financial calculations and analyses.
    currentPrice: { type: Number, required: true },
  },
  {
    // Option to automatically handle 'createdAt' and 'updatedAt' fields for each document in the collection.
    timestamps: true,
  }
);

/**
 * Exports the 'Coin' model, enabling CRUD (Create, Read, Update, Delete) operations
 * on documents within the MongoDB 'coins' collection that adhere to the 'coinSchema'.
 */
module.exports = mongoose.model("Coin", coinSchema);
// Example usage: Coin.find() to retrieve all documents from the 'coins' collection that match the schema.
