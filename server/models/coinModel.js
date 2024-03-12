// Import Mongoose for MongoDB interactions, providing a schema-based solution to model application data.
const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Extract Schema constructor to define data structure.

// Define the coinSchema with required 'name' and 'value' fields.
// Schemas allow detailed configuration of each field, such as type and required status.
const coinSchema = new Schema(
  {
    name: { type: String, required: true }, // 'name': Required string, each coin document must have a name.
    value: { type: Number, required: true }, // 'value': Required number, represents the coin's value.
  },
  {
    timestamps: true, // Enables automatic creation of 'createdAt' and 'updatedAt' fields.
  }
);

module.exports = mongoose.model("Coin", coinSchema); // Export the model, allowing it to be used elsewhere in the project.
// Usage example: Coin.find() to retrieve all coins from the collection.
