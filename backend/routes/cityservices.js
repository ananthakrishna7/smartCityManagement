const express = require('express');
const router = express.Router();

// Sample API route for city services
router.get('/', (req, res) => {
  res.json({ message: "Welcome to the City Services API" });
});

module.exports = router;
