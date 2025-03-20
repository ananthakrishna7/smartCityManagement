var express = require('express');
const forumController = require('../controllers/ForumController');
var router = express.Router();
router.get('/', forumController.getHomePage);
router.post('/create', forumController.createPost);
router.delete('/delete', forumController.deletePost);
router.post('/edit', forumController.editPost);

module.exports = router;
// /* GET home page. */
// router.get('/', function (req, res, next) {
//   res.json({ title: 'forum' });
// });

// // Route for creating a new post
// router.post('/create', function (req, res, next) {
//   const { title, content } = req.body;
//   if (!title || !content) {
//     return res.status(400).json({ message: 'Title and content are required' });
//   }
//   // Logic to create a new post
//   res.status(201).json({ message: 'Post created successfully', post: { title, content } });
// });

// // Route for deleting a post
// router.delete('/delete', function (req, res, next) {
//   const { id } = req.body;
//   if (!id) {
//     return res.status(400).json({ message: 'Post ID is required' });
//   }
//   // Logic to delete a post by ID
//   res.status(200).json({ message: `Post with ID ${id} deleted successfully` });
// });

// // Route for editing a post
// router.post('/edit', function (req, res, next) {
//   const { id, title, content } = req.body;
//   if (!id || !title || !content) {
//     return res.status(400).json({ message: 'Post ID, title, and content are required' });
//   }
//   // Logic to edit a post by ID
//   res.status(200).json({ message: `Post with ID ${id} updated successfully`, updatedPost: { title, content } });
// });

// module.exports = router;
