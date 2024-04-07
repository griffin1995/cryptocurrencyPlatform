// Import the User model to interact with the 'users' collection in the MongoDB database.
const User = require("../models/userModel");
// Import Mongoose to validate MongoDB Object IDs and facilitate other database interactions.
const mongoose = require("mongoose");

/**
 * Registers a new user by creating a document in the 'users' collection.
 * Validates the required fields and returns the new user data or an error message.
 *
 * @param {Object} request - The HTTP request object, containing user data in the body.
 * @param {Object} response - The HTTP response object used to send back the newly created user document or an error.
 */
const register = async (request, response) => {
  const { firstName, lastName, email, phoneNumber, password, paymentDetails } =
    request.body;
  let emptyFields = [];

  // Validate required fields and collect any that are missing.
  if (!firstName) emptyFields.push("firstName");
  if (!lastName) emptyFields.push("lastName");
  if (!email) emptyFields.push("email");
  if (!phoneNumber) emptyFields.push("phoneNumber");
  if (!password) emptyFields.push("password");

  if (emptyFields.length > 0) {
    response
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  } else {
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        paymentDetails,
      });
      response.status(200).json(user);
    } catch (error) {
      response
        .status(400)
        .json({ error: "Failed to create user", emptyFields });
    }
  }
};

/**
 * Placeholder for user login functionality. To be implemented.
 *
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object for sending back a login confirmation or an error.
 */
const login = async (request, response) => {
  response
    .status(200)
    .json({ message: "Login functionality to be implemented." });
};

/**
 * Retrieves a user's profile information based on their MongoDB Object ID.
 *
 * @param {Object} request - The HTTP request object, including the user's ID in the URL parameters.
 * @param {Object} response - The HTTP response object for sending back the user's profile information or an error.
 */
const getUserProfile = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    response.status(404).json({ error: "Invalid user ID" });
    return;
  }

  const user = await User.findById(id);
  if (!user) {
    response.status(404).json({ error: "User not found" });
    return;
  }

  response.status(200).json(user);
};

/**
 * Updates a user's profile information based on their MongoDB Object ID.
 *
 * @param {Object} request - The HTTP request object, including the user's ID and new data in the body.
 * @param {Object} response - The HTTP response object for sending back the updated user profile or an error.
 */
const updateUserProfile = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    response.status(404).json({ error: "Invalid user ID for update" });
    return;
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    { ...request.body },
    { new: true }
  );
  if (!user) {
    response.status(404).json({ error: "User not found for update" });
    return;
  }

  response.status(200).json(user);
};

// Export the controller functions to enable their use in defining Express route handlers, facilitating API endpoints.
module.exports = {
  register,
  login,
  getUserProfile,
  updateUserProfile,
};
