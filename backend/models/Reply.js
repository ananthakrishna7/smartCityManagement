const mongoose = require('mongoose');

// filepath: /home/ananthakrishnan/Documents/collegeStuff/Semester 6/Software Engineering/smartCityManagement/backend/models/Reply.js

const replySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming a User model exists
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ForumPost', // Reference to the ForumPost model
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
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;