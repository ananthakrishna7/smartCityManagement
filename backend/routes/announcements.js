var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'announcements' }); // return json with database entries
});

/* GET traffic incidents */
router.get('/traffic', (req, res) => {
  res.json({
    title: 'traffic data',
    data: "dummy"
  })
})

module.exports = router;
