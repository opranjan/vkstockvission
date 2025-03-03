const mongoose = require("mongoose");

const FormSubmissionSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true }, // Removed `unique: true`
  trading: { type: String, required: true },
  segment: { type: String, required: true },
  investment: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("FormSubmission", FormSubmissionSchema);
