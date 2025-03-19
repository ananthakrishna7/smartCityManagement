// app.js

const express = require('express');
const path = require('path');
const passport = require('passport');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const db = require("./config/db.js");

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
/*
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
/*
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
*/
db();

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/cityservices', require('./routes/grievances'));
app.use('/announcements', require('./routes/announcements'));
app.use('/forum', require('./routes/forum'));
app.use('/resourceManagement', require('./routes/resourceManagement'));
app.use('/transportation', require('./routes/transportation'));

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
