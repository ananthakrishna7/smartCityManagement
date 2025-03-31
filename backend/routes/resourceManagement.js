// ✅ Backend: routes/resources.js (Updated)
const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");

// POST: Add new resource data
router.post("/add", async (req, res) => {
  const { type, data } = req.body;
  if (!type || !data)
    return res.status(400).json({ message: "Type and data are required" });

  try {
    const resource = new Resource({ type, data });
    await resource.save();
    res.status(201).json({ message: "Resource added", resource });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET: Get all resources
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find({});
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT: Update a resource by ID
router.put("/update/:id", async (req, res) => {
  const { type, data } = req.body;
  try {
    const updated = await Resource.findByIdAndUpdate(
      req.params.id,
      { type, data },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Resource not found" });
    res.status(200).json({ message: "Resource updated", updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE: Remove a resource
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Resource.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Resource not found" });
    res.status(200).json({ message: "Resource deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
