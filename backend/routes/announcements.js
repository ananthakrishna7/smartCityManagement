var express = require("express");
var router = express.Router();
var AnnouncementModel = require("../models/Announcement.js");
var moment = require("moment");
// ✅ GET ALL ANNOUNCEMENTS
router.get("/", async (req, res) => {
  try {
    const announcements = await AnnouncementModel.find({}).lean();
    const normalizedAnnouncements = announcements.map((announcement) => {
      return {
        ...announcement,
        date: moment(announcement.date).format("YYYY-MM-DD"),
      };
    });
    res.status(200).json(normalizedAnnouncements);
  } catch (err) {
    console.error("Error fetching announcements:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ ADD A NEW ANNOUNCEMENT
router.post("/add", async (req, res) => {
  try {
    const { title, description, type } = req.body;

    // Validate required fields
    if (!title || !description || !type) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create and save new announcement
    const newAnnouncement = new AnnouncementModel({
      title,
      description,
      type,
    });
    await newAnnouncement.save();

    res.status(201).json({
      message: "Announcement created successfully",
      newAnnouncement,
    });
  } catch (err) {
    console.error("Error creating announcement:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ DELETE ANNOUNCEMENT BY ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if announcement exists
    const announcement = await AnnouncementModel.findById(id);
    if (!announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    // Delete announcement
    await AnnouncementModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (err) {
    console.error("Error deleting announcement:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
