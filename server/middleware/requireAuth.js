// Import the JWT library to handle JSON Web Tokens
const jwt = require("jsonwebtoken");

// Import the User model to interact with the database
const User = require("../models/userModel");

/**
 * Middleware to require authentication for routes.
 * It verifies the JWT from the authorization header and attaches the user's ID to the request.
 *
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @param {Function} next - The next middleware function in the stack.
 */
const requireAuth = async (request, response, next) => {
  // Retrieve the 'authorization' header from the request
  const { authorization } = request.headers;

  // If no authorization header is present, send a 401 Unauthorized response
  if (!authorization) {
    return response.status(401).json({ error: "Authorization token required" });
  }

  // Extract the token from the 'Authorization: Bearer <token>' header
  const token = authorization.split(" ")[1]; 

  try {
    // Verify the token using the secret key and extract the user ID
    const { _id } = jwt.verify(token, process.env.SECRET);

    // Find the user by ID and attach the user object (only the ID field) to the request
    request.user = await User.findOne({ _id }).select("_id"); 

    // Call the next middleware in the stack
    next();
  } catch (error) {
    // Log the error and send a 401 Unauthorized response if token verification fails
    console.error(error);
    response.status(401).json({ error: "Request not authorized" });
  }
};

// Export the middleware for use in other parts of the application
module.exports = requireAuth;
