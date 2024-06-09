const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
    index: true,
    trim: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
    trim: true
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    min: 2,
    max: 100
  },
  date: {
    type: Date,
    default: Date.now

  }
}, {
  timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
