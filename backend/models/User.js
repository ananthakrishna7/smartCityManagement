const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user",
  }, // You can modify the roles as needed
});

// Create and export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;
