// Import Mongoose for MongoDB interactions, providing a schema-based solution to model application data.
const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Extract Schema constructor to define data structure.

// Define the userSchema with fields: 'firstName', 'lastName', 'email', 'phoneNumber', 'password', 'paymentDetails'.
// Schemas allow detailed configuration of each field, such as type and required status.
const userSchema = new Schema(
  {
    firstName: { type: String, required: true }, // 'firstName': Required string.
    lastName: { type: String, required: true }, // 'lastName': Required string.
    email: { type: String, required: true, unique: true }, // 'email': Required string, must be unique.
    phoneNumber: { type: Number, required: true }, // 'phoneNumber': Required string.
    password: { type: String, required: true }, // 'password': Required string.
    paymentDetails: { type: Boolean, required: true, default: false }, // 'paymentDetails': Boolean, defaults to false if not provided.
  },
  {
    timestamps: true, // Enables automatic creation of 'createdAt' and 'updatedAt' fields.
  }
);

module.exports = mongoose.model("User", userSchema); // Export the model, allowing it to be used elsewhere in the project.
// Usage example: User.find() to retrieve all users from the collection.
