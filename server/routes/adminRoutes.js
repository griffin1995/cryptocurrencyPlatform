// Import the Express module to create an HTTP server and define API endpoints.
const express = require("express");

// Import controller functions that handle administrative actions on users, such as creating, listing, fetching, deleting, and updating user information.
const {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/adminController");

// Initialize an Express router to manage API routes for user-related operations, allowing for clean and organized route management.
const router = express.Router();

// Route for fetching a list of all users. It uses the GET HTTP method and, when accessed, invokes the getAllUsers controller function.
router.get("/", getAllUsers);

// Route for fetching a single user by their unique ID. The ':id' parameter in the URL path captures the user's ID from the request.
router.get("/:id", getUser);

// Route for creating a new user. This POST endpoint expects user data in the request body, which is processed by the createUser controller function.
router.post("/", createUser);

// Route for deleting a user by ID. This DELETE endpoint uses the ':id' parameter to identify and remove the specified user from the system.
router.delete("/:id", deleteUser);

// Route for partially updating a user's information. The PATCH method is used to apply updates to specific fields of a user's record, identified by their ID.
router.patch("/:id", updateUser);

// Export the router module to make these routes available for use in the main server configuration, integrating them into the application's API.
module.exports = router;
