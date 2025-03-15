var express = require('express');
var router = express.Router();
//import AnnouncementModel from '../models/Announcement';
var AnnouncementModel = require("../models/Announcement.js").default

/* USE THIS FOR GETTING AND MAKING ANNOUNCEMENTS */

// GET ALL ANNOUNCEMENTS
router.get('/', async (req, res) => {
  try {
    const announcements = await AnnouncementModel.find({});
    res.send(announcements);
  } catch (err) {
    res.status(500).send({ err });
  }
})

// MAKE NEW ANNOUNCEMENT
router.post('/new', async (req, res) => {
  const announcement = new AnnouncementModel(req.body);

  try {
    await announcement.save();
    res.send(announcement)
  } catch (err) {
    res.status(500).send(err);
  }
})

/* Announcemnts are fetched by the '/' GET method. The admin can 
choose which announcement to delete. The '/delete' route must send this 
announcement id along, possibly in the url, or in json format */
router.delete('/delete', async (req, res) => {
  try {
    const announcement = await AnnouncementModel.findByIdAndDelete(req.body.id);
    if (!announcement) {
      res.status(404).send('No item found');
    }
  } catch (err) {
    res.status(500).send("Error deleting announcement");
  }
}
  )

// /* GET traffic incidents */
// router.get('/traffic', (req, res) => {
//   res.json({
//     title: 'traffic data',
//     data: "dummy"
//   })
// })

module.exports = router;
