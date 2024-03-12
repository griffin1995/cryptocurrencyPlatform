// First, we import the 'mongoose' package, which we'll use to interact with MongoDB.
// Mongoose provides a straight-forward, schema-based solution to model your application data.
const mongoose = require("mongoose");

// The 'Schema' constructor is extracted from the mongoose object.
// A schema is used to define the structure of the documents within a collection in MongoDB.
// It specifies the types of data and whether they are required or have default values.
const Schema = mongoose.Schema;

// Here, we're creating a new schema named 'coinSchema' for our documents.
// This schema will be used for documents that represent coins in our database.
// We define the structure as an object passed to the Schema constructor.
// Each field in the document is defined within this object along with its data type and other options.
const coinSchema = new Schema(
  {
    // 'name' field: It's of type String and is required.
    // This means every document must have a 'name' field with a string value; if not, Mongoose will throw an error.
    name: { type: String, required: true },
    // 'value' field: It's of type Number and also required.
    // Similar to 'name', every document must have a 'value' field with a numerical value.
    value: { type: Number, required: true },
  },
  // The second parameter to the Schema constructor is an options object.
  // Here, we're enabling timestamps.
  // When enabled, Mongoose will automatically add two fields to our schema: `createdAt` and `updatedAt`.
  // These fields record the time a document is added to the collection and the last time it was updated, respectively.
  { timestamps: true }
);

module.exports = mongoose.model("Coin", coinSchema);

// Coin.find() - for example would find all of the coins within the coins collection

