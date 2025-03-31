const express = require("express");
const router = express.Router();
const TransportRoute = require("../models/Transport");

// GET all transport routes
router.get("/", async (req, res) => {
  try {
    const routes = await TransportRoute.find();
    res.status(200).json(routes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ADD a new transport route
router.post("/add", async (req, res) => {
  try {
    const { type, route, time, fare, stops, status } = req.body;

    if (!type || !route || !time || !fare || !stops || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRoute = new TransportRoute({
      type,
      route,
      time,
      fare,
      stops,
      status,
    });

    await newRoute.save();
    res.status(201).json({ message: "Route added successfully", newRoute });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE a transport route by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedRoute = await TransportRoute.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedRoute) {
      return res.status(404).json({ message: "Route not found" });
    }

    res
      .status(200)
      .json({ message: "Route updated successfully", updatedRoute });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a transport route by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRoute = await TransportRoute.findByIdAndDelete(id);

    if (!deletedRoute) {
      return res.status(404).json({ message: "Route not found" });
    }

    res.status(200).json({ message: "Route deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
