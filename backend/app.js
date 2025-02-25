// app.js

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Passport Middleware
app.use(passport.initialize());
require('./config/passport')(passport);

// JWT Authentication Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Database Connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
}
connectDB();

// Routes
app.use('/', require('./routes/index'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', verifyToken, require('./routes/users'));
app.use('/api/cityservices', verifyToken, require('./routes/cityservices'));
app.use('/api/announcements', verifyToken, require('./routes/announcements'));
app.use('/api/forum', verifyToken, require('./routes/forum'));
app.use('/api/resourceManagement', verifyToken, require('./routes/resourceManagement'));
app.use('/api/transportation', verifyToken, require('./routes/transportation'));

// Error Handling
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: err });
});

module.exports = app;