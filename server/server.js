// Loading the dotenv library and calling its config function.
// This loads environment variables from a .env file into process.env,
// making them accessible throughout the application.
require("dotenv").config();

// Importing the express library to create our server and define its behavior.
const express = require("express");
// Importing the routes for handling data-related requests from a separate file.
// This helps in organizing the route handlers by their purpose or related functionality.
const dataRoutes = require("./routes/data");
// Importing mongoose, an ODM (Object Document Mapper) library for MongoDB.
// It provides a schema-based solution to model application data.
const mongoose = require("mongoose");

// Initializing the express application.
const app = express();

// Middleware
// Adding middleware to parse JSON bodies in incoming requests.
// This allows us to access request body data as JavaScript objects.
app.use(express.json());
// Logging middleware that logs the path and method of all incoming requests.
// Helps in debugging and understanding the flow of requests through the application.
app.use((request, response, next) => {
  console.log(request.path, request.method);
  next(); // Calls the next middleware in the stack or the route handler.
});

// Routes
// Telling the app to use the imported routes for any requests that start with '/api/data'.
// This organizes our API endpoints under a common base path.
app.use("/api/data", dataRoutes);

// Attempt to connect to the database using the connection string stored in MONGO_URI environment variable.
mongoose
  .connect(process.env.MONGO_URI)
  // If the connection is successful, then start the server.
  .then(() => {
    // Listening for requests on the port specified in the PORT environment variable.
    app.listen(process.env.PORT, () => {
      console.log(
        "Success. Connected to the database.\nSuccess. Listening on port 4000."
      );
      // Note: The port message is hardcoded to 4000, but you might want to use process.env.PORT in the log as well.
    });
  })
  // If the connection fails, log the error.
  .catch((error) => {
    console.log(error);
  });

// The process.env object stores environment variables key-value pairs.
// Although not used directly in this snippet, it's often accessed for configuration values.
