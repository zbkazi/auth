const express = require('express');

const router = express.Router()

const createBlog = require('../controllers/blog/Create')
const getBlogs = require('../controllers/blog/getBlogs')


router.post('/create', createBlog);


router.get('/blogs', getBlogs);


module.exports = router;
