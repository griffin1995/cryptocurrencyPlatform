// Import the Mongoose library to facilitate interactions with MongoDB. Mongoose provides a straightforward model-based approach to managing MongoDB collections and documents.
const mongoose = require("mongoose");
// Destructure the Schema constructor from the Mongoose library. Schemas define the structure of documents within MongoDB collections, specifying data types and validation requirements.
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

/**
 * Define a schema for 'User' documents in the MongoDB database.
 * This schema specifies the structure, data types, and validation rules for user-related data.
 */
const userSchema = new Schema({
  // Define 'firstName' as a required string to store the user's first name.
  firstName: { type: String, required: true },
  // Define 'lastName' as a required string to store the user's last name.
  lastName: { type: String, required: true },
  // Define 'email' as a required and unique string to store the user's email address, ensuring no duplicates.
  email: { type: String, required: true, unique: true },
  // Define 'phoneNumber' as a required numeric field to store the user's phone number.
  phoneNumber: { type: Number, required: true },
  // Define 'password' as a required string to securely store the user's password.
  password: { type: String, required: true },
  // Define 'paymentDetails' as a boolean to indicate whether the user has provided payment information, defaulting to false if not specified.
  paymentDetails: { type: Boolean, default: false, required: true },
});

// Static method to register a new user. It checks for existing users with the same email to avoid duplicates,
// hashes the password for security, and creates a new user record in the database.
userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  paymentDetails
) {
  // Validate mandatory fields: Ensure all required fields are provided.
  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    throw new Error(
      "Please fill in all fields (userModel > userSchema.statics.signup)"
    );
  }

  // Validate the format of the email using validator library.
  if (!validator.isEmail(email)) {
    throw new Error("The email is invalid");
  }

  // Validate the strength of the password using validator library.
  if (!validator.isStrongPassword(password)) {
    throw new Error("The password is not strong enough");
  }

  // Check if an account already exists with the provided email to prevent duplicate entries.
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already exists");
  }

  // Generate a salt and hash the password to enhance security. Hashing prevents stored passwords from being
  // readable in the event of database access. Using a salt makes each hash unique to thwart rainbow table attacks.
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create and store a new user document in the database with hashed password and other provided details.
  const user = await this.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    password: hash,
    paymentDetails,
  });

  // Return the newly created user object for further use.
  return user;
};

/**
 * Static method to authenticate a user by their email and password.
 * This method first checks if both email and password are provided. If not, it throws an error.
 * It then attempts to find a user by email. If no user is found, it throws an error.
 * If a user is found, it compares the provided password with the hashed password stored in the database.
 * If the password matches, it returns the user object; otherwise, it throws an error indicating the password is incorrect.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} The authenticated user object.
 * @throws {Error} If input fields are missing, the user cannot be found, or the password is incorrect.
 */
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error(
      "Please fill in all fields (userModel > userSchema.statics.login)"
    );
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error(
      "Can't find a user with this email (userModel > userSchema.statics.login)"
    );
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error(
      "Incorrect password (userModel > userSchema.statics.login)"
    );
  }

  return user;
};

// Export the User model, which allows for creating, reading, updating, and deleting (CRUD) operations on 'User' documents in the 'users' collection using the defined schema.
module.exports = mongoose.model("User", userSchema);
