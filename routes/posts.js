const express = require('express');
const router = express.Router();
const { getPosts, postPosts, getSinglePost, deletePost } = require('../controllers/posts');

const { protect } = require('../middleware/auth');

router.route('/')
    .get(getPosts)
    .post(protect, postPosts)

router.route('/:id')
    .get(getSinglePost)
    .delete(protect, deletePost)

module.exports = router;