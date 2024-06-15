const express = require('express');
const category = express.Router();

// Import controllers
const { create, getAll,remove, update  } = require('../controllers/category');

// Define category routes
category.post('/create', create);

category.get('/categories', getAll);


category.delete('/remove/:id', remove);
category.put('/update/:id', update);

module.exports = category;
