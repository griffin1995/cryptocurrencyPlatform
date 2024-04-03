// Import the User model to interact with the MongoDB 'users' collection.
const User = require("../models/userModel");
// Import Mongoose for MongoDB object modeling and to utilize its schema validation and ObjectId.
const mongoose = require("mongoose");

/**
 * Creates a new user document in the database.
 *
 * @param {Object} request - The HTTP request object, containing user data in the body.
 * @param {Object} response - The HTTP response object used to return data or errors.
 */
const createUser = async (request, response) => {
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
 * Retrieves and returns all user documents from the database, sorted by creation date.
 *
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object for returning data or errors.
 */
const getAllUsers = async (request, response) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  response.status(200).json(users);
};

/**
 * Retrieves a single user document by its unique ID.
 *
 * @param {Object} request - The HTTP request object, including the user ID in the params.
 * @param {Object} response - The HTTP response object for returning the user document or errors.
 */
const getUser = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid id check for user" });
  }

  const user = await User.findById(id);

  if (!user) {
    return response.status(404).json({ error: "Can't find the user" });
  }

  response.status(200).json(user);
};

/**
 * Retrieves a single user document by its unique ID.
 *
 * @param {Object} request - The HTTP request object, including the user ID in the params.
 * @param {Object} response - The HTTP response object for returning the user document or errors.
 */
const getUserEmail = async (request, response) => {
  const { email } = request.params;

  const user = await User.findOne({email});

  if (!user) {
    return response.status(404).json({ error: "Can't find the user" });
  }

  response.status(200).json(user);
};

/**
 * Deletes a user document using its unique ID.
 *
 * @param {Object} request - The HTTP request object, including the user ID in the params.
 * @param {Object} response - The HTTP response object for confirming deletion or reporting errors.
 */
const deleteUser = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid ID for user (Delete)" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return response.status(404).json({ error: "Couldn't find the user" });
  }

  response.status(200).json(user);
};

/**
 * Updates an existing user document with new data provided in the request body.
 *
 * @param {Object} request - The HTTP request object, including the user ID in the params and update data in the body.
 * @param {Object} response - The HTTP response object for returning the updated document or errors.
 */
const updateUser = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid ID for user (Update)" });
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    { ...request.body },
    { new: true } // Option to return the document after update.
  );

  if (!user) {
    return response.status(404).json({ error: "Couldn't find the user" });
  }

  response.status(200).json(user);
};

// Export the controller functions to be used in Express route definitions.
module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserEmail,
  deleteUser,
  updateUser,
};
