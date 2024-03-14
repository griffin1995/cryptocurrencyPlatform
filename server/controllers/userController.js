// Import the User model to interact with the 'users' collection in the MongoDB database.
const User = require("../models/userModel");
// Import Mongoose for its database interaction capabilities, especially for validating MongoDB Object IDs.
const mongoose = require("mongoose");

/**
 * Registers a new user by creating a new document in the 'users' collection.
 *
 * @param {Object} request - The HTTP request object, containing user data in the body.
 * @param {Object} response - The HTTP response object used to send back the newly created user document or an error.
 */
const register = async (request, response) => {
  const { firstName, lastName, email, phoneNumber, password, paymentDetails } =
    request.body;

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
    response.status(400).json({ error: error.message });
  }
};

/**
 * Placeholder for user login functionality. To be implemented.
 *
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object for sending back a login confirmation or an error.
 */
const login = async (request, response) => {
  response.status(200).json({ message: "Login functionality." });
};

/**
 * Retrieves a user's profile information based on their ID.
 *
 * @param {Object} request - The HTTP request object, including the user's ID in the URL parameters.
 * @param {Object} response - The HTTP response object for sending back the user's profile information or an error.
 */
const getUserProfile = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response
      .status(404)
      .json({ error: "Invalid id for user profile retrieval" });
  }

  const user = await User.findById(id);

  if (!user) {
    return response.status(404).json({ error: "Can't find the user" });
  }

  response.status(200).json(user);
};

/**
 * Updates a user's profile information based on their ID.
 *
 * @param {Object} request - The HTTP request object, including the user's ID and new data in the body.
 * @param {Object} response - The HTTP response object for sending back the updated user profile or an error.
 */
const updateUserProfile = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response
      .status(404)
      .json({ error: "Invalid ID for user profile update" });
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    { ...request.body },
    { new: true } // Option to return the document after update.
  );

  if (!user) {
    return response
      .status(404)
      .json({ error: "Couldn't find the user to update" });
  }

  response.status(200).json(user);
};

// Export the controller functions to allow their use in Express route definitions, enabling API endpoints.
module.exports = {
  register,
  login,
  getUserProfile,
  updateUserProfile,
};
