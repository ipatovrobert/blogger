const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/auth');
const { getPersonalPosts } = require('../controllers/posts');

const { protect } = require('../middleware/auth');

router.route('/register')
      .post(register);

router.route('/login')
      .post(login);

router.route('/me')
      .get(protect, getMe)

router.route('/posts')
      .get(protect, getPersonalPosts)


module.exports = router;