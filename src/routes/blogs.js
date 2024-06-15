const express = require('express');
const blogs = express.Router();

const { create, getBlogs, getBlogByParams, search, update, remove } = require('../controllers/blog');
const { blogLimiter, validateQuery} = require('../middleware')

blogs.post('/create', blogLimiter, create);

blogs.get('/blogs/:id', blogLimiter, getBlogByParams, validateQuery);
blogs.get('/blogs', blogLimiter, getBlogs);

blogs.get('/search', search);

blogs.put('/update/:id', blogLimiter, update);

blogs.delete('/remove/:id', blogLimiter, remove);

module.exports = blogs;
