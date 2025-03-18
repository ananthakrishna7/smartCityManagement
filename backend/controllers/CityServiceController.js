const Grievance = require("../models/Grievance");

// Submit a new grievance
exports.submitGrievance = async (req, res) => {
  try {
    const { name, email, issueType, description } = req.body;
    const grievance = new Grievance({ name, email, issueType, description });
    await grievance.save();
    res
      .status(201)
      .json({ message: "Grievance submitted successfully", grievance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch all grievances (for admin)
exports.getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find().sort({ createdAt: -1 });
    res.status(200).json(grievances);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update grievance status (for admin)
exports.updateGrievanceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, severity } = req.body;
    const grievance = await Grievance.findByIdAndUpdate(
      id,
      { status, severity },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Grievance updated successfully", grievance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch grievances by email (for citizen)
exports.getGrievancesByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const grievances = await Grievance.find({ email }).sort({ createdAt: -1 });
    res.status(200).json(grievances);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
