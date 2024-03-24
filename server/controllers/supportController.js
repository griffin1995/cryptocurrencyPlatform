// Import required modules and models
const SupportTicket = require("../models/supportTicketModel");
const mongoose = require("mongoose");

/**
 * Creates a new support ticket.
 *
 * Extracts ticket information from the request body and uses the SupportTicket model
 * to create a new ticket entry in the database. Returns the created ticket object
 * or an error message upon failure.
 *
 * @param {Object} request - The request object containing the ticket information.
 * @param {Object} response - The response object for sending back the created ticket or an error message.
 */
const createTicket = async (request, response) => {
  const {
    userId,
    status,
    assignedSupportStaffId,
    subject,
    body,
    priority,
    category,
    firstName,
    lastName,
    email,
    phoneNumber,
    contactTime,
  } = request.body;
  try {
    const ticket = await SupportTicket.create({
      userId,
      status,
      assignedSupportStaffId,
      subject,
      body,
      priority,
      category,
      firstName,
      lastName,
      email,
      phoneNumber,
      contactTime,
    });
    response.status(200).json(ticket);
  } catch (error) {
    response.status(400).json({
      message:
        "Failed to create support ticket. Please check your input and try again.",
      error: error.message,
    });
  }
};

/**
 * Retrieves all support tickets.
 *
 * Fetches all tickets from the database, sorts them by creation time in ascending order,
 * and returns them. Returns an error message upon failure.
 *
 * @param {Object} request - The request object.
 * @param {Object} response - The response object for sending back the tickets or an error message.
 */
const getAllTickets = async (request, response) => {
  try {
    const tickets = await SupportTicket.find({}).sort({ createdAt: 1 });
    response.status(200).json(tickets);
  } catch (error) {
    response.status(500).json({
      message: "Failed to retrieve tickets. Please try again later.",
      error: error.message,
    });
  }
};

/**
 * Retrieves a single support ticket by ID.
 *
 * Validates the ticket ID format and fetches the ticket from the database if valid.
 * Returns the ticket object or an error message if the ticket is not found or in case of an error.
 *
 * @param {Object} request - The request object containing the ticket ID in params.
 * @param {Object} response - The response object for sending back the ticket or an error message.
 */
const getTicket = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({
      message: "Invalid ticket ID format. Please check the ID and try again.",
    });
  }

  try {
    const ticket = await SupportTicket.findById(id);
    if (!ticket) {
      return response.status(404).json({
        message: "Ticket not found. Please check the ID and try again.",
      });
    }
    response.status(200).json(ticket);
  } catch (error) {
    response.status(500).json({
      message: "Error retrieving the ticket. Please try again later.",
      error: error.message,
    });
  }
};

/**
 * Deletes a support ticket by ID.
 *
 * Validates the ticket ID format and attempts to delete the corresponding ticket from the database.
 * Returns a success message upon deletion or an error message if the ticket is not found or in case of an error.
 *
 * @param {Object} request - The request object containing the ticket ID in params.
 * @param {Object} response - The response object for sending back the deletion status or an error message.
 */
const deleteTicket = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({
      message:
        "Invalid ticket ID format for deletion. Please check the ID and try again.",
    });
  }

  try {
    const ticket = await SupportTicket.findOneAndDelete({ _id: id });
    if (!ticket) {
      return response.status(404).json({
        message:
          "Ticket for deletion not found. Please check the ID and try again.",
      });
    }
    response.status(200).json({ message: "Ticket deleted successfully." });
  } catch (error) {
    response.status(500).json({
      message: "Error deleting the ticket. Please try again later.",
      error: error.message,
    });
  }
};

/**
 * Updates a support ticket by ID.
 *
 * Validates the ticket ID format and attempts to update the corresponding ticket with the request body data.
 * Returns the updated ticket object upon success or an error message if the ticket is not found or in case of an error.
 *
 * @param {Object} request - The request object containing the updated ticket information and ticket ID in params.
 * @param {Object} response - The response object for sending back the updated ticket or an error message.
 */
const updateTicket = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({
      message:
        "Invalid ticket ID format for update. Please check the ID and try again.",
    });
  }

  try {
    const ticket = await SupportTicket.findByIdAndUpdate(
      { _id: id },
      { ...request.body },
      { new: true }
    );
    if (!ticket) {
      return response.status(404).json({
        message:
          "Ticket for update not found. Please check the ID and try again.",
      });
    }
    response.status(200).json(ticket);
  } catch (error) {
    response.status(500).json({
      message: "Error updating the ticket. Please try again later.",
      error: error.message,
    });
  }
};

// Export the controller functions to be used in router definitions
module.exports = {
  createTicket,
  getAllTickets,
  getTicket,
  deleteTicket,
  updateTicket,
};
