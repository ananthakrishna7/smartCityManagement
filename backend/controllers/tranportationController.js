const TransportRoute = require("../models/TransportRoute");

// Fetch all transport routes
exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await TransportRoute.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch a specific route by ID
exports.getRouteById = async (req, res) => {
  try {
    const route = await TransportRoute.findById(req.params.id);
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.json(route);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new transport route
exports.addRoute = async (req, res) => {
  try {
    const newRoute = new TransportRoute(req.body);
    await newRoute.save();
    res.status(201).json({newRoute});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an existing transport route
exports.updateRoute = async (req, res) => {
  try {
    const updatedRoute = await TransportRoute.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoute) return res.status(404).json({ message: "Route not found" });
    res.json(updatedRoute);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a transport route
exports.deleteRoute = async (req, res) => {
  try {
    const deletedRoute = await TransportRoute.findByIdAndDelete(req.params.id);
    if (!deletedRoute) return res.status(404).json({ message: "Route not found" });
    res.json({ message: "Route deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
