const mongoose = require("mongoose");

// Define a Schema constructor from mongoose
const Schema = mongoose.Schema;

// Define the schema for a support ticket.
// This schema includes fields for user identification, ticket status, assignment,
// subject, body, priority, category, user contact information, and timestamps for creation and updates.
const supportTicketSchema = new Schema(
  {
    // Unique identifier for the user who submitted the ticket.
    userId: { type: String, required: true },
    // Current status of the ticket, restricted to specific values with a default state.
    status: {
      type: String,
      required: true,
      enum: ["Unanswered", "Replied", "Resolved"],
      default: "Unanswered",
    },
    // Identifier for the support staff assigned to the ticket, if any.
    assignedSupportStaffId: { type: String, required: false },

    // Detailed description of the issue or query.
    body: { type: String, required: true },
    // Category of the issue, helpful for routing or analysis.
    category: { type: String, required: false },
    // First name of the ticket submitter.
    firstName: { type: String, required: true },
    // Last name of the ticket submitter.
    lastName: { type: String, required: true },
    // Email address of the ticket submitter for communication.
    email: { type: String, required: true },
    // Optional phone number for alternative contact.
    phoneNumber: { type: String, required: false },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps.
  }
);

// Export the SupportTicket model, enabling CRUD operations on documents within the 'users' collection using the defined schema.
module.exports = mongoose.model("SupportTicket", supportTicketSchema);
