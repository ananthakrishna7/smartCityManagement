const ForumPost = require('../models/ForumPost'); // Assuming ForumPost model exists
const Reply = require('../models/Reply');

// filepath: c:\Users\HP\Documents\GitHub\smartCityManagement\backend\controllers\ForumController.js

// Controller for getting the forum home page
exports.getHomePage = (req, res) => {
    res.json({ title: 'forum' });
};

// Controller for creating a new post
exports.createPost = async (req, res) => {
    const { title, content, userId, type } = req.body;
    if (!title || !content || !userId || !type) {
        return res.status(400).json({ message: 'Title, content, user ID, and type are required' });
    }

    try {
        const newPost = await ForumPost.create({ title, content, userId, type });
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

// Controller for deleting a post
exports.deletePost = async (req, res) => {
    const { id, userId } = req.body;
    if (!id || !userId) {
        return res.status(400).json({ message: 'Post ID and user ID are required' });
    }

    try {
        const deletedPost = await ForumPost.findOneAndDelete({ _id: id, userId });
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found or unauthorized' });
        }
        res.status(200).json({ message: `Post with ID ${id} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
};

// Controller for editing a post
exports.editPost = async (req, res) => {
    const { id, title, content, userId, replies, upvotes, downvotes } = req.body;
    if (!id || !userId) {
        return res.status(400).json({ message: 'Post ID and user ID are required' });
    }

    const updateFields = {};
    if (title) updateFields.title = title;
    if (content) updateFields.content = content;
    if (replies) updateFields.replies = replies;
    if (typeof upvotes === 'number') updateFields.upvotes += upvotes;
    if (typeof downvotes === 'number') updateFields.downvotes += downvotes;

    try {
        const updatedPost = await ForumPost.findOneAndUpdate(
            { _id: id, userId },
            updateFields,
            { new: true, runValidators: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found or unauthorized' });
        }
        res.status(200).json({ message: `Post with ID ${id} updated successfully`, updatedPost });
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
};
