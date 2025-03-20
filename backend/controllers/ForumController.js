const ForumPost = require('../models/ForumPost'); // Assuming ForumPost model exists
const Reply = require('../models/Reply');

// filepath: c:\Users\HP\Documents\GitHub\smartCityManagement\backend\controllers\ForumController.js

// Controller for getting the forum home page
exports.getHomePage = (req, res) => { // might work
    var posts = ForumPost.find({}).lean()
    posts = posts.map((post)=>{
        return {
            ...post,
            _id: post._id.toSting(),
            userId: post.userId.toString(),
            replies: post.replies.map((reply)=>{
                reply = reply.toString()
            })
        }
    })
    res.status(200).json(posts)
};

// Controller for creating a new post
exports.createPost = async (req, res) => {
    const { title, content, userId, type } = req.body;
    if (!title || !content || !userId || !type) {
        return res.status(400).json({ message: 'Title, content, user ID, and type are required' });
    }
    if (type === 'reply') {
        const { postId } = req.body;
        if (!postId) {
            return res.status(400).json({ message: 'Post ID is required for a reply' });
        }
        try {
            const newReply = await Reply.create({ content, userId, postId });
            return res.status(201).json({ message: 'Reply created successfully', reply: newReply });
        } catch (error) {
            return res.status(500).json({ message: 'Error creating reply', error: error.message });
        }
    } else if (type !== 'post') {
        return res.status(400).json({ message: 'Invalid type. Must be "post" or "reply"' });
    }
    try {
        const newPost = await ForumPost.create({ title, content, userId });
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

// Controller for deleting a post
exports.deletePost = async (req, res) => {
    const { id, userId, type } = req.body;
    if (!id || !userId || !type) {
        return res.status(400).json({ message: 'Post ID and user ID are required' });
    }
    if (type === 'reply') {
        try {
            const deletedReply = await Reply.findOneAndDelete({ _id: id, userId });
            if (!deletedReply) {
                return res.status(404).json({ message: 'Reply not found or unauthorized' });
            }
            return res.status(200).json({ message: `Reply with ID ${id} deleted successfully` });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting reply', error: error.message });
        }
    } else if (type !== "post"){
        return res.status(400).json({ message: 'Invalid type. Must be "post" or "reply"' });
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
    const { id, title, content, userId, replies, upvotes, downvotes, type } = req.body;
    if (!id || !userId) {
        return res.status(400).json({ message: 'Post ID and user ID are required' });
    }

    const updateFields = {};
    if (title) updateFields.title = title;
    if (content) updateFields.content = content;
    if (replies) updateFields.replies = replies;
    if (typeof upvotes === 'number') updateFields.upvotes += upvotes;
    if (typeof downvotes === 'number') updateFields.downvotes += downvotes;
    if (type === 'reply') {
        try {
            const updatedReply = await Reply.findOneAndUpdate(
                { _id: id, userId },
                updateFields,
                { new: true, runValidators: true }
            );
            if (!updatedReply) {
                return res.status(404).json({ message: 'Reply not found or unauthorized' });
            }
            return res.status(200).json({ message: `Reply with ID ${id} updated successfully`, updatedReply });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating reply', error: error.message });
        }
    } else if (type !== 'post') {
        return res.status(400).json({ message: 'Invalid type. Must be "post" or "reply"' });
    }
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
