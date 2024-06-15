const express = require('express');
const blogs = express.Router();

const { create, getBlogs, getBlogByParams } = require('../controllers/blog');
const { blogLimiter, validateQuery} = require('../middleware')

blogs.post('/create', create, blogLimiter);

blogs.get('/blogs/:id', getBlogByParams, validateQuery, blogLimiter);
blogs.get('/blogs', getBlogs, blogLimiter);

module.exports = blogs;
