const express = require('express');
const router = express.Router();

// Import routers
const blogs = require('./blogs');
const comments = require('./comments');

// Use routers
router.use('/b', blogs);
router.use('/c', comments);

module.exports = router;
