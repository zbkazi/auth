const express = require('express');
const blogs = express.Router();

const { create, getBlogs, getBlogByParams } = require('../controllers/blog');
const { blogLimiter, validateQuery} = require('../middleware')

blogs.post('/create', blogLimiter, create);

blogs.get('/blogs/:id', getBlogByParams, validateQuery);
blogs.get('/blogs',blogLimiter, getBlogs);

module.exports = blogs;
