var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('auth');
});

router.post('/register', (req, res) => {
  res.json({ title: "Register user" })
})

router.post('/login', (req, res) => {
  res.json({ title: "Login user" })
})

router.get('/current', (req, res) => {
  res.json({ title: "Current user" })
})
module.exports = router;
