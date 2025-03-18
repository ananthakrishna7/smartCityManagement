const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who reported the grievance
  title: { type: String, required: true },
  description: { type: String, required: true },
  severity: {
    type: String,
    required: true,
    enum: ["Low", "Medium", "High"], // Severity of the issue
  },
  status: {
    type: String,
    default: "Pending", // Possible values: Pending, In Progress, Resolved
    enum: ["Pending", "In Progress", "Resolved"],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Grievance", grievanceSchema);
