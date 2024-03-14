// Imports the User model for database interactions with the 'users' collection.
const User = require("../models/userModel");
// Imports mongoose to work with MongoDB and utilize its utilities, such as ID validation.
const mongoose = require("mongoose");

// Registers a new user
const register = async (request, response) => {
  const { firstName, lastName, email, phoneNumber, password, paymentDetails } = request.body;

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

// User login
const login = async (request, response) => {
  response.status(200).json({ message: "Login functionality." });
};

// Retrieves the currently authenticated user's profile.
const getUserProfile = async (request, response) => {
  const { id } = request.params; 

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid id for user profile retrieval" });
  }

  const user = await User.findById(id);

  if (!user) {
    return response.status(404).json({ error: "Can't find the user" });
  }

  response.status(200).json(user);
};

// Updates the currently authenticated user's profile.
const updateUserProfile = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid ID for user profile update" });
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    { ...request.body },
    { new: true }
  );

  if (!user) {
    return response.status(404).json({ error: "Couldn't find the user to update" });
  }

  response.status(200).json(user); // Responds with the updated user profile.
};

module.exports = {
  register,
  login,
  getUserProfile,
  updateUserProfile,
};
