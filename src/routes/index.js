const express = require('express');

const router = express.Router()

const createBlog = require('../controllers/blog/Create')



router.post('/', createBlog);


module.exports = router;
