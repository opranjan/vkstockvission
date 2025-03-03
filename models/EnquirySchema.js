const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true } // Adds `createdAt` & `updatedAt` fields automatically
);

module.exports = mongoose.model("Enquiry", EnquirySchema);
