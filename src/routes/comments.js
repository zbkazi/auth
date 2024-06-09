const express = require('express');
const comment = express.Router();

// Import controllers
const { create, comments, remove, update } = require('../controllers/comment');

// Define comment routes
comment.post('/create', create);
comment.get('/comments', comments);
comment.delete('/remove/:id', remove);
comment.put('/update/:id', update);

module.exports = comment;
