const express = require('express');
const comment = express.Router();

// Import controllers
const { create, comments, deletes, update } = require('../controllers/comment');

// Define comment routes
comment.post('/create', create);
comment.get('/comments', comments);
comment.delete('/delete', deletes);
comment.put('/update', update);

module.exports = comment;
