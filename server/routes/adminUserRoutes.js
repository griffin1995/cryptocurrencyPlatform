// Import the Express framework to enable HTTP server and API route definitions.
const express = require("express");

// Import functions from the adminUserController that encapsulate the logic for user management operations,
// including registration, login, profile retrieval, and profile updates.
const {
  register,
  login,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/adminUserController");

// Initialize an Express router to define and manage API routes.
const router = express.Router();

// Define a POST route for user registration. This endpoint receives data for creating new users
// and delegates the registration logic to the register function.
router.post("/register", register);

// Define a POST route for user login. This endpoint handles the submission of user credentials
// and authenticates them using the login function.
router.post("/login", login);

// Define a GET route for retrieving the logged-in user's profile. The getUserProfile function
// fetches and returns the user's detailed information.
router.get("/profile", getUserProfile);

// Define a PATCH route for updating the logged-in user's profile. This method supports partial modifications
// to user data, with the updateUserProfile function processing these updates.
router.patch("/profile", updateUserProfile);

// Export the router to integrate these routes into the main server configuration, enabling their use in the application's API.
module.exports = router;
