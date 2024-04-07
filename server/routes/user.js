// Import the Express library to create routing capabilities for the server.
const express = require("express");

// Import the authentication functions from the userController.
const { loginUser, signupUser } = require("../controllers/userController");

// Initialize the Express Router to manage user authentication routes.
const router = express.Router();

// Define a POST route for user login. This route will invoke the loginUser function,
// which handles authentication based on the credentials provided in the request body.
router.post("/login", loginUser);

// Define a POST route for user registration. This route will invoke the signupUser function,
// which handles new user registration using the data provided in the request body.
router.post("/signup", signupUser);

// Export the router to enable its integration into the main application server.
module.exports = router;
