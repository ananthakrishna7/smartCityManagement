const mongoose = require("mongoose");

const transportRouteSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["Bus", "Metro", "Train"],
  },
  route: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  fare: {
    type: String,
    required: true,
  },
  stops: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["On Time", "Delayed", "Cancelled"],
    default: "On Time",
  },
});

module.exports = mongoose.model("Transport", transportRouteSchema);
