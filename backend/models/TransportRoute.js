const mongoose = require("mongoose");

const TransportRouteSchema = new mongoose.Schema({
  routeName: { type: String, required: true },
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  timings: [{ type: String, required: true }], // Example: ["08:00 AM", "10:00 AM"]
  realTimeStatus: { type: String, enum: ["On Time", "Delayed", "Cancelled"], default: "On Time" }
});

module.exports = mongoose.model("TransportRoute", TransportRouteSchema);
