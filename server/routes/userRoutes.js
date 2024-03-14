// Import Express for building the server and defining API routes.
const express = require('express');

// Import controller functions for handling user operations.
const {
  register,
  login,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');

// Initialize an Express router to define routes for handling requests related to 'users'.
const router = express.Router();

// Route for user registration.
router.post('/register', register);

// Route for user login.
router.post('/login', login);

// Route for retrieving the currently authenticated user's profile.
// Consider using authentication middleware here to ensure the user is logged in.
router.get('/profile', getUserProfile);

// Route for updating the currently authenticated user's profile.
// Consider using authentication middleware here to ensure the user is logged in.
router.patch('/profile', updateUserProfile);

// Export the router to integrate it into the Express application.
module.exports = router;
