const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Electricity", "Water", "Gas", "Waste", "Transport"],
    required: true,
  },
  data: [
    {
      month: String,
      usage: Number,
      cost: Number,
      consumption: Number,
      bill: Number,
      recycled: Number,
      landfill: Number,
      users: Number,
      efficiency: Number,
    },
  ],
});

module.exports = mongoose.model("Resource", resourceSchema);
