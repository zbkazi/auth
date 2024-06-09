const express = require('express');
const comments = express.Router();

// Import controllers
const { create } = require('../controllers/comment');

// Define comment routes
comments.post('/create', create);

module.exports = comments;
