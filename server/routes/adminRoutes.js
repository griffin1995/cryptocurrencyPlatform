// Import the Express module to set up the HTTP server and define API endpoints, facilitating the creation of RESTful web services.
const express = require("express");

// Import functions from the adminController module that handle administrative actions on users.
// These actions include creating, listing, fetching specific users, deleting, and updating user information.
const {
  createUser, // Function to create a new user
  getAllUsers, // Function to retrieve all users
  getUser, // Function to retrieve a specific user by ID
  getUserEmail, // Function to retrieve a specific user by Email
  deleteUser, // Function to delete a specific user by ID
  updateUser, // Function to update a specific user by ID
} = require("../controllers/adminController");
const requireAuth = require("../middleware/requireAuth");
// Initialize an Express Router. This allows for defining a series of route handlers for the user-related operations,
// enabling organized management of API routes.

// Initialize an Express Router to define and manage routes for user-related operations.
const router = express.Router();

// Apply the authentication middleware to all routes in this router to ensure only authorized access.
router.use(requireAuth);

// Define a GET route for fetching a list of all users.
// When accessed, this route invokes the getAllUsers function from the controller.
router.get("/", getAllUsers);

// Define a GET route for fetching a single user by their unique ID.
// The ':id' parameter in the URL path dynamically captures the user's ID from the incoming request.
router.get("/:id", getUser);

// Define a POST route for creating a new user.
// This endpoint expects user data in the request body, which the createUser function from the controller processes.
router.post("/", createUser);

// Define a DELETE route for removing a user by their ID.
// This route utilizes the ':id' parameter to identify the user to be deleted.
router.delete("/:id", deleteUser);

// Define a PATCH route for updating partial information of a user's record.
// The route identifies the user by their ID and applies updates to specific fields as per the request body.
router.patch("/:id", updateUser);

// Export the router object.
// This makes the defined routes available for integration into the application's main server configuration,
// thereby becoming part of the application's API.
module.exports = router;
