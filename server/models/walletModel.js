const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema definition for the Wallet model. This schema links to a User and manages their cryptocurrency holdings.
const walletSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    assets: [
      {
        coinId: {
          type: String,
          required: true,
        },
        coinName: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    depositMoney: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Method to add a new coin holding or update an existing one in the wallet.
walletSchema.methods.modifyHolding = async function (coinId, coinName, amount) {
  const index = this.assets.findIndex((asset) => asset.coinId === coinId);

  if (index >= 0) {
    this.assets[index].amount += amount;
    // Remove asset if amount becomes 0 or negative
    if (this.assets[index].amount <= 0) {
      this.assets.splice(index, 1);
    }
  } else if (amount > 0) {
    this.assets.push({ coinId, coinName, amount });
  }

  try {
    await this.save();
    return this;
  } catch (error) {
    throw new Error("Unable to modify holding: " + error.message);
  }
};

// Method to check if user has sufficient funds
walletSchema.methods.hasSufficientFunds = function (amount) {
  return this.depositMoney >= amount;
};

// Method to check if user has sufficient assets to sell
walletSchema.methods.hasSufficientAssets = function (coinId, amount) {
  const asset = this.assets.find((asset) => asset.coinId === coinId);
  return asset && asset.amount >= amount;
};

// Method to get total portfolio value (would need current prices in real implementation)
walletSchema.methods.getPortfolioSummary = function () {
  return {
    totalAssets: this.assets.length,
    cashBalance: this.depositMoney,
    assets: this.assets.map((asset) => ({
      coinId: asset.coinId,
      coinName: asset.coinName,
      amount: asset.amount,
    })),
  };
};

module.exports = mongoose.model("Wallet", walletSchema);
