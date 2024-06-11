const express = require('express');
const blogs = express.Router();

 const { create, getBlogs } = require('../controllers/blog');


blogs.post('/create', create);
blogs.get('/blogs', getBlogs);

module.exports = blogs;
