require("dotenv").config();

const express = require("express");
const dataRoutes = require("./routes/data");

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

// listen for requests
app.listen(process.env.PORT, () => {
    console.log("Success. Listening on port 4000");
});

process.env;