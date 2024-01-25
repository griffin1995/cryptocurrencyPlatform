require("dotenv").config();

const express = require("express");

// express app
const app = express();
//middleware - request/response logging
app.use((request, response, next) => {
  console.log(request.path, request.method);
  next();
});

// routes
app.get("/", (request, response) => {
  response.json({
    message: "Welcome to cryptoApp",
  });
});

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("Success. Listening on port 4000");
});

process.env;
