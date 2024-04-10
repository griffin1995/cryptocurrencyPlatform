// Import the Express module to set up the HTTP server and define API endpoints, facilitating the creation of RESTful web services.
const express = require("express");

// Import functions from the walletController module that handle wallet actions.
// These actions include creating, listing wallets, fetching a wallet by user ID, updating, and deleting wallet information.
const {
  createWallet, // Function to create a new wallet
  getAllWallets, // Function to retrieve all wallets
  getWalletByUserId, // Function to retrieve a wallet by the user's ID
  updateWallet, // Function to update a specific wallet by ID
  deleteWallet, // Function to delete a specific wallet by ID
} = require("../controllers/walletController");
const requireAuth = require("../middleware/requireAuth");

// Initialize an Express Router to define and manage routes for wallet-related operations.
const router = express.Router();

// Apply the authentication middleware to all routes in this router to ensure only authorized access.
router.use(requireAuth);

// Define a GET route for fetching a list of all wallets.
// When accessed, this route invokes the getAllWallets function from the controller.
router.get("/", getAllWallets);

// Define a GET route for fetching a single wallet by the associated user ID.
// The ':userId' parameter in the URL path dynamically captures the user ID from the incoming request.
router.get("/user/:userId", getWalletByUserId);

// Define a POST route for creating a new wallet.
// This endpoint expects wallet data in the request body, which the createWallet function from the controller processes.
router.post("/", createWallet);

// Define a DELETE route for removing a wallet by its ID.
// This route utilizes the ':id' parameter to identify the wallet to be deleted.
router.delete("/:id", deleteWallet);

// Define a PATCH route for updating partial information of a wallet's record.
// The route identifies the wallet by its ID and applies updates to specific fields as per the request body.
router.patch("/:id", updateWallet);

// Export the router object.
// This makes the defined routes available for integration into the application's main server configuration,
// thereby becoming part of the application's API.
module.exports = router;
