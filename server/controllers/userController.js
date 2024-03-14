// Imports the User model for database interactions with the 'users' collection.
const User = require("../models/userModel");
// Imports mongoose to work with MongoDB and utilize its utilities, such as ID validation.
const mongoose = require("mongoose");

// Creates a new user entry in the database from request data.
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

// Retrieves all users from the database, sorted by their creation date.
const getAllUsers = async (request, response) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  response.status(200).json(users);
};

// Retrieves a specific user by their ID.
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

// Deletes a user by their ID from the database.
const deleteUser = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid ID for user (Delete)" });
  }
  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return response.status(404).json({ error: "Couldn't find the user" });
  }

  response.status(200).json(user); // Responds with the deleted user (for privacy, consider just confirming deletion).
};

// Updates a user's information by their ID.
const updateUser = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid ID for user (Update)" });
  }
  const user = await User.findOneAndUpdate(
    { _id: id },
    { ...request.body },
    { new: true }
  );

  if (!user) {
    return response.status(404).json({ error: "Couldn't find the user" });
  }

  response.status(200).json(user); // Responds with the updated user.
};

// Exports functions for routing use, enabling CRUD operations on users.
module.exports = {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
};
