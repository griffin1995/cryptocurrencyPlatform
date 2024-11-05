const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Define a schema for 'Coin' documents in the MongoDB database.
 * This schema specifies the structure, data types, and validation rules for coin-related data.
 */
const coinSchema = new Schema({
  // Define 'symbol' as a required string to store the coin's trading symbol.
  symbol: { type: String, required: true },
  // Define 'name' as a required string to store the full name of the coin.
  name: { type: String, required: true },
  // Define 'maxSupply' as a number to store the maximum supply of the coin.
  maxSupply: { type: Number },
  // Define 'marketCapUsd' as a number to store the coin's market capitalization in USD.
  marketCapUsd: { type: Number },
  // Define 'volumeUsd24Hr' as a number to store the trading volume in USD over the last 24 hours.
  volumeUsd24Hr: { type: Number },
  // Define 'priceUsd' as a number to store the current price in USD.
  priceUsd: { type: Number },
  // Define 'changePercent24Hr' as a number to store the percentage change in price over the last 24 hours.
  changePercent24Hr: { type: Number },
  // Define 'vwap24Hr' as a number to store the Volume Weighted Average Price over the last 24 hours.
  vwap24Hr: { type: Number },
  // Define 'explorer' as a string to store the URL to the blockchain explorer for the coin.
  explorer: { type: String },
  // Optionally add a timestamp for the last update.
  updatedAt: { type: Date, default: Date.now },
});

/**
 * Static method to register a new coin. It checks for existing coins with the same symbol to avoid duplicates,
 * and creates a new coin record in the database.
 */
coinSchema.statics.createCoin = async function (
  symbol,
  name,
  maxSupply,
  marketCapUsd,
  volumeUsd24Hr,
  priceUsd,
  changePercent24Hr,
  vwap24Hr,
  explorer
) {
  // Validate mandatory fields: Ensure all required fields are provided.
  if (!symbol || !name) {
    throw new Error(
      "Please fill in all required fields (coinModel > coinSchema.statics.createCoin)"
    );
  }

  // Check if an account already exists with the provided symbol to prevent duplicate entries.
  const exists = await this.findOne({ symbol });
  if (exists) {
    throw new Error("Symbol already exists");
  }

  // Create and store a new coin document in the database with provided details.
  const coin = await this.create({
    symbol,
    name,
    maxSupply,
    marketCapUsd,
    volumeUsd24Hr,
    priceUsd,
    changePercent24Hr,
    vwap24Hr,
    explorer,
  });

  // Return the newly created coin object for further use.
  return coin;
};

// Export the Coin model, which allows for creating, reading, updating, and deleting (CRUD) operations on 'Coin' documents in the 'coins' collection using the defined schema.
module.exports = mongoose.model("Coin", coinSchema);
