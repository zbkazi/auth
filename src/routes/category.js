const express = require('express');
const category = express.Router();

// Import controllers
const { createCategory } = require('../controllers/category');

// Define category routes
category.post('/create', createCategory);

module.exports = category;
