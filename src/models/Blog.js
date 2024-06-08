const {Schema, model} = require('mongoose')

const blogSchema = new Schema(
    {
      authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
        trim: true,
        unique: true,
        min: 2,
        max: 30,
      },
      title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        min: 2,
        max: 60,
      },
      metaTitle: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        min: 2,
        max: 60,

      },
      slug: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        min: 2,
        max: 60,

      },
      description: {
        type: String,
        required: true,
        trim: true,
        min: 2,
        max: Infinity,
      },
      image: {
        type: String,
        required: true,
        trim: true,
        min: 2,
        max: 100,
      },
      author: {
        type: String,
        required: true,
        trim: true,
        min: 2,
        max: 100,
      },
      views: {
        type: Number,
        default: 0,
        index: true,
        min: 0,
        max: Infinity,
      },
      date: {
        type: Date,
        default: Date.now,
        index: true,
        min: 2,
        max: 100,
      },
    },
    {
      timestamps: true,
    }
  );
  
  const Blog = model("Blog", blogSchema);
  
 module.exports = Blog;