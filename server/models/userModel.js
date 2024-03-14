// Import Mongoose library for MongoDB interactions. Mongoose simplifies working with MongoDB collections and documents through schemas.
const mongoose = require("mongoose");
// Destructure the Schema constructor from the Mongoose package. Schema defines the structure of documents within a collection in MongoDB.
const Schema = mongoose.Schema;

/**
 * Define the schema for user documents within the MongoDB database.
 * This schema outlines the expected structure and data types of user-related data.
 */
const userSchema = new Schema(
  {
    // firstName: Required string field to store the user's first name.
    firstName: { type: String, required: true },
    // lastName: Required string field to store the user's last name.
    lastName: { type: String, required: true },
    // email: Required and unique string field to store the user's email address.
    email: { type: String, required: true, unique: true },
    // phoneNumber: Required field to store the user's phone number as a number.
    // Note: It's often more practical to store phone numbers as strings to preserve formatting and leading zeros.
    phoneNumber: { type: Number, required: true },
    // password: Required string field to store the user's password.
    password: { type: String, required: true },
    // paymentDetails: Boolean field indicating whether payment details have been provided, defaults to false if unspecified.
    paymentDetails: { type: Boolean, required: true, default: false },
  },
  {
    // Enable automatic handling of createdAt and updatedAt fields to track document creation and last update times.
    timestamps: true,
  }
);

// Export the User model, enabling CRUD operations on documents within the 'users' collection using the defined schema.
module.exports = mongoose.model("User", userSchema);
