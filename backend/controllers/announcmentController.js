const Announcement = require("../models/Announcement");

// ✅ Fetch all announcements
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error while fetching announcements." });
  }
};

// ✅ Add a new announcement
const addAnnouncement = async (req, res) => {
  const { title, description, date, type } = req.body;
  try {
    const newAnnouncement = new Announcement({
      title,
      description,
      date,
      type,
    });
    await newAnnouncement.save();
    res
      .status(201)
      .json({ message: "Announcement added successfully", newAnnouncement });
  } catch (error) {
    res.status(500).json({ message: "Failed to add announcement" });
  }
};

// ✅ Delete an announcement
const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;
  try {
    await Announcement.findByIdAndDelete(id);
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete announcement" });
  }
};

module.exports = { getAnnouncements, addAnnouncement, deleteAnnouncement };
