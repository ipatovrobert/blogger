const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    tags: [{
        type: String,
        required: true
    }],
    body: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    user: {
        type: Object,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Posts', PostsSchema);