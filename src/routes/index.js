const express = require('express');

const router = express.Router()
// import controllers here
const createBlog = require('../controllers/blog/Create')
const getBlogs = require('../controllers/blog/getBlogs')
const authUser = require('../controllers/auth/authUser')

// import middleware here



router.post('/create', createBlog);
router.get('/blogs', getBlogs);



// auth middleware
router.post('/auth/user', authUser)


module.exports = router;
