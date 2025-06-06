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
  console.log("🎫 Creating token for user ID:", _id);
  const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: "7d" });
  console.log("🎫 Token created successfully");
  return token;
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
  console.log("🎯 ===== LOGIN USER FUNCTION CALLED =====");
  console.log("📧 Request headers:", {
    "content-type": request.headers["content-type"],
    "user-agent": request.headers["user-agent"],
    origin: request.headers["origin"],
  });
  console.log("📧 Request body:", request.body);
  console.log("📧 Request method:", request.method);
  console.log("📧 Request URL:", request.originalUrl);

  const { email, password } = request.body;

  // Validate input
  if (!email || !password) {
    console.error("❌ Missing email or password in request");
    return response
      .status(400)
      .json({ error: "Email and password are required" });
  }

  console.log("📧 Extracted email:", email);
  console.log("🔒 Password provided:", !!password);
  console.log("🔒 Password length:", password?.length);

  try {
    console.log("🔐 Attempting to authenticate user with email:", email);

    // Attempt to authenticate the user with provided credentials
    const user = await User.login(email, password);
    console.log("✅ User authenticated successfully!");
    console.log("👤 User found - ID:", user._id);
    console.log("👤 User found - Email:", user.email);

    // Generate a token for the authenticated user
    const token = createToken(user._id);

    const responseData = { _id: user._id, email: user.email, token };
    console.log("📤 Sending response:", {
      _id: responseData._id,
      email: responseData.email,
      token: token ? "TOKEN_PROVIDED" : "NO_TOKEN",
    });

    // Respond with the user's email and token upon successful authentication
    response.status(200).json(responseData);
    console.log("✅ Login response sent successfully");
  } catch (error) {
    console.error("❌ Authentication failed!");
    console.error("❌ Error type:", error.constructor.name);
    console.error("❌ Error message:", error.message);
    console.error("❌ Error stack:", error.stack);

    // Respond with an error status and message if authentication fails
    response.status(400).json({ error: error.message });
    console.log("📤 Error response sent");
  }

  console.log("🎯 ===== LOGIN USER FUNCTION COMPLETED =====");
};

/**
 * Register a new user by using details provided in the request body.
 * This function attempts to create a new user via the User.signup method and responds with the new user data or an error.
 *
 * @param {Object} request - The HTTP request object containing user data.
 * @param {Object} response - The HTTP response object used to send back the new user data or error message.
 */
const signupUser = async (request, response) => {
  console.log("📝 ===== SIGNUP USER FUNCTION CALLED =====");
  console.log("📧 Request body:", request.body);

  const { firstName, lastName, email, phoneNumber, password } = request.body;

  console.log("📝 Extracted signup data:", {
    firstName,
    lastName,
    email,
    phoneNumber,
    passwordProvided: !!password,
    passwordLength: password?.length,
  });

  try {
    console.log("🔐 Attempting to create new user with email:", email);

    // Attempt to create a new user with the provided details using the User.signup method defined in the userModel.
    const user = await User.signup(
      firstName,
      lastName,
      email,
      phoneNumber,
      password
    );

    console.log("✅ User created successfully!");
    console.log("👤 New user - ID:", user._id);
    console.log("👤 New user - Email:", user.email);

    // Create a JSON Web Token for the newly created user using their MongoDB ID.
    const token = createToken(user._id);

    const responseData = { _id: user._id, email: user.email, token };
    console.log("📤 Sending signup response:", {
      _id: responseData._id,
      email: responseData.email,
      token: token ? "TOKEN_PROVIDED" : "NO_TOKEN",
    });

    // If the user is successfully created, return the user's email and token as confirmation.
    response.status(200).json(responseData);
    console.log("✅ Signup response sent successfully");
  } catch (error) {
    console.error("❌ Signup failed!");
    console.error("❌ Error type:", error.constructor.name);
    console.error("❌ Error message:", error.message);
    console.error("❌ Error stack:", error.stack);

    // If there is an error during user creation, respond with a 400 status code and the error message.
    response.status(400).json({ error: error.message });
    console.log("📤 Signup error response sent");
  }

  console.log("📝 ===== SIGNUP USER FUNCTION COMPLETED =====");
};

// Export the loginUser and signupUser functions to make them available for use in other parts of the application.
module.exports = { loginUser, signupUser };
