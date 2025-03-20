const mongoose = require('mongoose');

const forumPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    upvotes: {
        type: Number,
        default: 0,
    },
    downvotes: {
        type: Number,
        default: 0,
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reply', // Assuming a Reply model exists
        },
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming a User model exists
        required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const ForumPost = mongoose.model('ForumPost', forumPostSchema);

module.exports = ForumPost;