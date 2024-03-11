const express = require("express");

const router = express.Router();

// GET all data
router.get("/", (request, response) => {
  response.json({
    mssg: "GET all data",
  });
});

// GET single coin
router.get("/:id", (request, response) => {
  response.json({
    mssg: "GET single data",
  });
});

// POST new coin
router.post("/", (request, response) => {
  response.json({
    mssg: "POST new data",
  });
});
// DELETE new coin
router.delete("/:id", (request, response) => {
  response.json({
    mssg: "DELETE data",
  });
});
// UPDATE new stock
router.patch("/:id", (request, response) => {
  response.json({
    mssg: "UPDATE data",
  });
});

module.exports = router;
