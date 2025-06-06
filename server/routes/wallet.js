// Import the Express module to set up the HTTP server and define API endpoints, facilitating the creation of RESTful web services.
const express = require("express");

// Import functions from the walletController module that handle wallet actions.
const {
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
} = require("../controllers/walletController");
const requireAuth = require("../middleware/requireAuth");

// Initialize an Express Router to define and manage routes for wallet-related operations.
const router = express.Router();

// Apply the authentication middleware to all routes in this router to ensure only authorized access.
router.use(requireAuth);

// BASIC WALLET OPERATIONS
// Define a GET route for fetching a list of all wallets.
router.get("/", getAllWallets);

// Define a GET route for fetching a single wallet by the associated user ID.
router.get("/user/:userId", getWalletByUserId);

// Define a GET route for getting portfolio value and summary
router.get("/portfolio/:userId", getPortfolioValue);

// Define a POST route for creating a new wallet.
router.post("/", createWallet);

// Define a DELETE route for removing a wallet by its ID.
router.delete("/:id", deleteWallet);

// Define a PATCH route for updating partial information of a wallet's record.
router.patch("/:id", updateWallet);

// MONEY MANAGEMENT OPERATIONS
// Define a POST route for depositing money into a wallet
router.post("/deposit", depositMoney);

// Define a POST route for withdrawing money from a wallet
router.post("/withdraw", withdrawMoney);

// TRADING OPERATIONS
// Define a POST route for buying cryptocurrency assets
router.post("/buy", buyAsset);

// Define a POST route for selling cryptocurrency assets
router.post("/sell", sellAsset);

// Export the router object.
module.exports = router;
