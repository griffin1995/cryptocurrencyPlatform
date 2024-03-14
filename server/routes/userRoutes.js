// Require the Express framework to facilitate the creation of an HTTP server and define API routes.
const express = require("express");

// Import controller functions related to user actions. These encapsulate the logic for user registration, login,
// retrieving a user's profile, and updating a user's profile information.
const {
  register,
  login,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

// Initialize an Express router. Routers are used to define route handlers for different HTTP request paths.
const router = express.Router();

// Define a route for user registration. This uses the POST HTTP method indicating that data will be sent to the server
// to create a new user. The register function handles the business logic for registration.
router.post("/register", register);

// Define a route for user login. This also uses the POST method, where login credentials are sent to the server.
// The login function verifies the credentials and handles user authentication.
router.post("/login", login);

// Define a route for fetching the logged-in user's profile. The GET method is used here to retrieve data.
// The getUserProfile function is responsible for fetching and returning the user's details.
router.get("/profile", getUserProfile);

// Define a route for updating the logged-in user's profile. The PATCH method allows for partial updates of the user's details.
// The updateUserProfile function applies the updates to the user's profile based on the provided data.
router.patch("/profile", updateUserProfile);

// Export the router so it can be imported and used in the main server file, allowing these routes to be part of the application's API.
module.exports = router;
