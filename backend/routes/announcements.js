var express = require("express");
var router = express.Router();
var AnnouncementModel = require("../models/Announcement.js");

// ✅ GET ALL ANNOUNCEMENTS
router.get("/", async (req, res) => {
  try {
    const announcements = await AnnouncementModel.find({});
    if (!announcements || announcements.length === 0) {
      return res.status(404).json({ error: "No announcements found" });
    }
    res.status(200).json(announcements);
  } catch (err) {
    console.error("Error fetching announcements:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

// ✅ MAKE A NEW ANNOUNCEMENT
router.post("/", async (req, res) => {
  try {
    const { title, description, type } = req.body;

    if (!title || !description || !type) {
      return res
        .status(400)
        .json({ error: "Title, description, and type are required" });
    }

    const announcement = new AnnouncementModel(req.body);
    await announcement.save();

    res.status(201).json({
      message: "Announcement created successfully",
      announcement,
    });
  } catch (err) {
    console.error("Error creating announcement:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

// ✅ GET TRAFFIC INCIDENTS
router.get("/traffic", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Traffic data retrieved successfully",
    data: "dummy",
  });
});

module.exports = router;
