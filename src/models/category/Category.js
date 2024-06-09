const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Category schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  
},{
  timestamps: true
});

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
