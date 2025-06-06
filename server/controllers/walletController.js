// Import the Wallet model to interact with the MongoDB 'wallets' collection.
const Wallet = require("../models/walletModel");
// Import Mongoose for MongoDB object modeling.
const mongoose = require("mongoose");

/**
 * Creates a new wallet document in the database.
 */
const createWallet = async (request, response) => {
  const { userId } = request.body;

  try {
    // Check if wallet already exists for this user
    const existingWallet = await Wallet.findOne({ userId });
    if (existingWallet) {
      return response
        .status(400)
        .json({ error: "Wallet already exists for this user" });
    }

    const wallet = await Wallet.create({
      userId,
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
 */
const getAllWallets = async (request, response) => {
  try {
    const wallets = await Wallet.find({});
    response.status(200).json(wallets);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves a single wallet document by its associated user's ID.
 */
const getWalletByUserId = async (request, response) => {
  const userId = request.params.userId;

  try {
    const wallet = await Wallet.findOne({ userId });
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
      { new: true }
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

/**
 * Deposit money into user's wallet
 */
const depositMoney = async (request, response) => {
  const { userId, amount } = request.body;

  if (!userId || !amount || amount <= 0) {
    return response
      .status(400)
      .json({ error: "Valid userId and positive amount required" });
  }

  try {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return response.status(404).json({ error: "Wallet not found" });
    }

    wallet.depositMoney += parseFloat(amount);
    await wallet.save();

    response.status(200).json({
      message: "Money deposited successfully",
      wallet,
      transaction: {
        type: "deposit",
        amount: parseFloat(amount),
        timestamp: new Date(),
      },
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

/**
 * Withdraw money from user's wallet
 */
const withdrawMoney = async (request, response) => {
  const { userId, amount } = request.body;

  if (!userId || !amount || amount <= 0) {
    return response
      .status(400)
      .json({ error: "Valid userId and positive amount required" });
  }

  try {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return response.status(404).json({ error: "Wallet not found" });
    }

    if (wallet.depositMoney < amount) {
      return response.status(400).json({ error: "Insufficient funds" });
    }

    wallet.depositMoney -= parseFloat(amount);
    await wallet.save();

    response.status(200).json({
      message: "Money withdrawn successfully",
      wallet,
      transaction: {
        type: "withdrawal",
        amount: parseFloat(amount),
        timestamp: new Date(),
      },
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

/**
 * Buy cryptocurrency assets
 */
const buyAsset = async (request, response) => {
  const { userId, coinId, coinName, amount, pricePerUnit } = request.body;

  if (
    !userId ||
    !coinId ||
    !coinName ||
    !amount ||
    !pricePerUnit ||
    amount <= 0 ||
    pricePerUnit <= 0
  ) {
    return response.status(400).json({
      error:
        "Valid userId, coinId, coinName, amount, and pricePerUnit required",
    });
  }

  try {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return response.status(404).json({ error: "Wallet not found" });
    }

    const totalCost = parseFloat(amount) * parseFloat(pricePerUnit);

    if (wallet.depositMoney < totalCost) {
      return response
        .status(400)
        .json({ error: "Insufficient funds for purchase" });
    }

    // Deduct money from wallet
    wallet.depositMoney -= totalCost;

    // Add or update asset in wallet
    const existingAssetIndex = wallet.assets.findIndex(
      (asset) => asset.coinId === coinId
    );

    if (existingAssetIndex >= 0) {
      // Update existing asset
      wallet.assets[existingAssetIndex].amount += parseFloat(amount);
    } else {
      // Add new asset
      wallet.assets.push({
        coinId,
        coinName,
        amount: parseFloat(amount),
      });
    }

    await wallet.save();

    response.status(200).json({
      message: "Asset purchased successfully",
      wallet,
      transaction: {
        type: "buy",
        coinId,
        coinName,
        amount: parseFloat(amount),
        pricePerUnit: parseFloat(pricePerUnit),
        totalCost,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

/**
 * Sell cryptocurrency assets
 */
const sellAsset = async (request, response) => {
  const { userId, coinId, amount, pricePerUnit } = request.body;

  if (
    !userId ||
    !coinId ||
    !amount ||
    !pricePerUnit ||
    amount <= 0 ||
    pricePerUnit <= 0
  ) {
    return response.status(400).json({
      error: "Valid userId, coinId, amount, and pricePerUnit required",
    });
  }

  try {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return response.status(404).json({ error: "Wallet not found" });
    }

    // Find the asset in wallet
    const assetIndex = wallet.assets.findIndex(
      (asset) => asset.coinId === coinId
    );

    if (assetIndex === -1) {
      return response.status(400).json({ error: "Asset not found in wallet" });
    }

    const asset = wallet.assets[assetIndex];
    const sellAmount = parseFloat(amount);

    if (asset.amount < sellAmount) {
      return response
        .status(400)
        .json({ error: "Insufficient asset amount to sell" });
    }

    const totalRevenue = sellAmount * parseFloat(pricePerUnit);

    // Add money to wallet
    wallet.depositMoney += totalRevenue;

    // Update or remove asset
    if (asset.amount === sellAmount) {
      // Remove asset completely
      wallet.assets.splice(assetIndex, 1);
    } else {
      // Reduce asset amount
      asset.amount -= sellAmount;
    }

    await wallet.save();

    response.status(200).json({
      message: "Asset sold successfully",
      wallet,
      transaction: {
        type: "sell",
        coinId,
        amount: sellAmount,
        pricePerUnit: parseFloat(pricePerUnit),
        totalRevenue,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

/**
 * Get wallet portfolio value with current prices
 */
const getPortfolioValue = async (request, response) => {
  const userId = request.params.userId;

  try {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return response.status(404).json({ error: "Wallet not found" });
    }

    // In a real app, you'd fetch current prices from an API
    // For now, we'll return the basic portfolio structure
    const portfolio = {
      cash: wallet.depositMoney,
      assets: wallet.assets,
      totalAssets: wallet.assets.length,
      lastUpdated: new Date(),
    };

    response.status(200).json(portfolio);
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
  depositMoney,
  withdrawMoney,
  buyAsset,
  sellAsset,
  getPortfolioValue,
};
