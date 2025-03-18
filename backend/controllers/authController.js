const User = require("../models/User"); // Assuming User model is defined

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the plain-text password with the stored password in the database
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // If passwords match, return a success message
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Registration function
const register = async (req, res) => {
  const { name, email, password, role = "user" } = req.body;

  try {
    // Check if the email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Create a new user instance without hashing the password
    const user = new User({
      name,
      email,
      password, // Store plain-text password
      role,
    });

    // Save the user to the database
    await user.save();

    // Return success message
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }
};

module.exports = { login, register };
