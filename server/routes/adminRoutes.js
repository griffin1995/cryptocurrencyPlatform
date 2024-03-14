// Import Express for building the server and defining API routes.
const express = require("express");

// Import controller functions for handling CRUD operations on users.
const {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/adminController");



// Initialize an Express router to define routes for handling requests related to 'users'.
const router = express.Router();

// Route for retrieving all users. Uses the 'getAllUsers' controller to handle the request.
router.get("/", getAllUsers);

// Route for retrieving a single user by ID. Uses the 'getUser' controller to handle the request.
router.get("/:id", getUser);

// Route for adding a new user. Uses the 'createUser' controller to handle the request.
router.post("/", createUser);

// Route for removing a user by ID. Uses the 'deleteUser' controller to handle the request.
router.delete("/:id", deleteUser);

// Route for updating a user by ID. Uses the 'updateUser' controller to handle the request.
router.patch("/:id", updateUser);

// Export the router to integrate it into the Express application.
module.exports = router;
