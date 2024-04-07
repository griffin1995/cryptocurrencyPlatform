// Import the User model from the userModel file. This model is used for interacting with the 'User' documents in the MongoDB database.
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

/**
 * Creates a JSON Web Token for a user based on their MongoDB ID.
 *
 * @param {string} _id - The MongoDB ID of the user.
 * @return {string} The generated JSON Web Token, set to expire in 7 days.
 */
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "7d" });
};

/**
 * Authenticates a user based on email and password.
 * This function attempts to log in a user using the User.login method. If successful, it generates
 * a token and returns the user's email and token. If authentication fails, it returns an error.
 *
 * @param {Object} request - The HTTP request object containing the user's credentials.
 * @param {Object} response - The HTTP response object used to send the authentication result.
 */
const loginUser = async (request, response) => {
  const { email, password } = request.body;

  try {
    // Attempt to authenticate the user with provided credentials
    const user = await User.login(email, password);

    // Generate a token for the authenticated user
    const token = createToken(user._id);

    // Respond with the user's email and token upon successful authentication
    response.status(200).json({ email, token });
  } catch (error) {
    // Respond with an error status and message if authentication fails
    response.status(400).json({ error: error.message });
  }
};

/**
 * Register a new user by using details provided in the request body.
 * This function attempts to create a new user via the User.signup method and responds with the new user data or an error.
 *
 * @param {Object} request - The HTTP request object containing user data.
 * @param {Object} response - The HTTP response object used to send back the new user data or error message.
 */
const signupUser = async (request, response) => {
  const { firstName, lastName, email, phoneNumber, password, paymentDetails } =
    request.body;

  try {
    // Attempt to create a new user with the provided details using the User.signup method defined in the userModel.
    const user = await User.signup(
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      paymentDetails
    );

    // Create a JSON Web Token for the newly created user using their MongoDB ID.
    const token = createToken(user._id);
    // If the user is successfully created, return the user's email and token as confirmation.
    response.status(200).json({ email, token });
  } catch (error) {
    // If there is an error during user creation, respond with a 400 status code and the error message.
    response.status(400).json({ error: error.message });
  }
};

// Export the loginUser and signupUser functions to make them available for use in other parts of the application.
module.exports = { loginUser, signupUser };
