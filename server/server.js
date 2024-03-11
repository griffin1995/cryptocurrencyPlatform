require("dotenv").config();

const express = require("express");
const dataRoutes = require("./routes/data");
const mongoose = require("mongoose");

// express app
const app = express();

//
//middleware
app.use(express.json());
////request/response logging
app.use((request, response, next) => {
  console.log(request.path, request.method);
  next();
});

// routes
app.use("/api/data", dataRoutes);

// attempt to connec to database
mongoose
  .connect(process.env.MONGO_URI)
  //if success then:
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Success. Connected to the database.\nSuccess. Listening on port 4000.");
    });
  })
  //else
  .catch((error) => {
    console.log(error);
  });

process.env;
