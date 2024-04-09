const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema definition for the Wallet model. This schema links to a User and manages their cryptocurrency holdings.
const walletSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User document to whom this wallet belongs.
  holdings: [
    {
      coinId: { type: Schema.Types.ObjectId, ref: "Coin", required: true }, // Reference to the Coin document.
      amountHeld: { type: Number, required: true }, // Amount of the coin currently held in the wallet.
    },
  ],
});

// Method to add a new coin holding or update an existing one in the wallet.
walletSchema.methods.modifyHolding = async function (coinId, amount) {
  const index = this.holdings.findIndex((holding) =>
    holding.coinId.equals(coinId)
  );
  if (index >= 0) {
    this.holdings[index].amountHeld += amount; // Update the amount held if the coin is already in the wallet.
  } else {
    this.holdings.push({ coinId, amountHeld: amount }); // Add a new holding if the coin is not already in the wallet.
  }
  await this.save();
};

const Wallet = mongoose.model("Wallet", walletSchema);
