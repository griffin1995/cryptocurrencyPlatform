const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supportTicketSchema = new Schema(
  {
    userID: { type: String, required: True }, //better name?
    status: { type: Boolean, required: True }, //unanswered, replied, resolved?
    supportID: { type: String, required: false }, //better name? i mean the staff thats helping
    body: { type: String, required: True },
    priority: { type: String, required: False },
    department: { type: String, required: False },
  },
  { timestamps: true }
);
