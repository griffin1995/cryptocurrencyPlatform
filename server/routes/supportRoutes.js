// Import the Express module to set up the HTTP server and define API endpoints, facilitating the creation of RESTful web services.
const express = require("express");

// Import functions from the supportController module that handle actions on support tickets. 
// These actions include creating, listing, fetching specific tickets, deleting, and updating ticket information.
const {
  createTicket,   // Function to create a new ticket
  getAllTickets,  // Function to retrieve all tickets
  getTicket,      // Function to retrieve a specific ticket by ID
  deleteTicket,   // Function to delete a specific ticket by ID
  updateTicket,   // Function to update a specific ticket by ID
} = require("../controllers/supportController");

// Initialize an Express Router. This allows for defining a series of route handlers for the ticket-related operations, 
// enabling organized management of API routes.
const router = express.Router();

// Define a GET route for fetching a list of all tickets. 
// When accessed, this route invokes the getAllTickets function from the controller.
router.get("/", getAllTickets);

// Define a GET route for fetching a single ticket by its unique ID. 
// The ':id' parameter in the URL path dynamically captures the ticket's ID from the incoming request.
router.get("/:id", getTicket);

// Define a POST route for creating a new ticket. 
// This endpoint expects ticket data in the request body, which the createTicket function from the controller processes.
router.post("/", createTicket);

// Define a DELETE route for removing a ticket by its ID. 
// This route utilizes the ':id' parameter to identify the ticket to be deleted.
router.delete("/:id", deleteTicket);

// Define a PATCH route for updating partial information of a ticket's record. 
// The route identifies the ticket by its ID and applies updates to specific fields as per the request body.
router.patch("/:id", updateTicket);

// Export the router object. 
// This makes the defined routes available for integration into the application's main server configuration, 
// thereby becoming part of the application's API.
module.exports = router;
