const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Helper to create a JWT for a user based on their MongoDB ID
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "7d" });
};

// Authenticates a user based on email and password
const loginUser = async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.login(email, password);
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    const token = createToken(user._id);

    // Respond with the full user object and token
    response.status(200).json({
      _id: user._id,

      email: user.email,

      token,
    });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Registers a new user and returns their data along with a new JWT
const signupUser = async (request, response) => {
  const { firstName, lastName, email, phoneNumber, password } = request.body;

  try {
    const user = await User.signup(
      firstName,
      lastName,
      email,
      phoneNumber,
      password
    );
    if (!user) {
      return response.status(400).json({ error: "Error creating user" });
    }
    const token = createToken(user._id);

    // Return the full user details with token
    response.status(201).json({
      _id: user._id,
      email: user.email,
      token,
    });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
