const express = require('express');
const router = express.Router();

// Import routers
const blogs = require('./blogs');
const comment = require('./comments');
const category = require('./category');

// Use routers
router.use('/b', blogs);
router.use('/c', comment);
router.use('/cat', category);

module.exports = router;
