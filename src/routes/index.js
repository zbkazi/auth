const express = require('express');
const router = express.Router();

// Import routers
const blogs = require('./blogs');
const comment = require('./comments');

// Use routers
router.use('/b', blogs);
router.use('/c', comment);

module.exports = router;
