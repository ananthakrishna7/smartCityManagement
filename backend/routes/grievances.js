const express = require("express");
const Grievance = require("../models/Grievance");
const router = express.Router();
const moment = require("moment")
// ✅ Submit Grievance (for citizens)
router.post("/submit", async (req, res) => {
  try {
    const { userId, title, description, severity } = req.body;

    if (!userId || !title || !description || !severity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newGrievance = new Grievance({
      userId,
      title,
      description,
      severity,
    });

    await newGrievance.save();
    res
      .status(201)
      .json({ message: "Grievance submitted successfully", newGrievance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get All Grievances (for admin)
router.get("/", async (req, res) => {
  try {
    const grievances = await Grievance.find().sort({
      severity: -1,
      createdAt: -1,
    }).lean();

    const normalizedGrievances = grievances.map((grievance)=>{
      return {
        ...grievance,
        userId: grievance.userId.toString(),
                _id: grievance._id.toString(),
        createdAt: moment(grievance.createdAt).format("YYYY-MM-DD")
      }
    })
    res.status(200).json(normalizedGrievances);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get Grievances for a Specific User
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const grievances = await Grievance.find({ userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(grievances);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update Grievance Status (for admin)
router.put("/resolve/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedGrievance = await Grievance.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedGrievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    res.status(200).json({ message: "Grievance updated", updatedGrievance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
