const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema definition for the Wallet model. This schema links to a User and manages their cryptocurrency holdings.
const walletSchema = new Schema({
  id: { type: String, required: true },
  assets: [
    {
      coinId: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
  depositMoney: { type: Number, default: 0 },
});

// Method to add a new coin holding or update an existing one in the wallet.
walletSchema.methods.modifyHolding = async function (coinId, amount) {
  const index = this.coins.findIndex((coin) => coin.coinId.equals(coinId));

  if (index >= 0) {
    this.coins[index].amountHeld += amount;
  } else {
    this.coins.push({ coinId, amountHeld: amount });
  }
  try {
    await this.save();
  } catch (error) {
    throw new Error("Unable to modify");
  }
};

module.exports = mongoose.model("Wallet", walletSchema);

