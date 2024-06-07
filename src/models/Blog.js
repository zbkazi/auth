const {Schema, model} = require('mongoose')

const blogSchema = new Schema(
    {
      authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      title: {
        type: String,
        required: true,
      },
      metaTitle: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
      },
      slug: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
      },
      description: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      views: {
        type: Number,
        default: 0,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );
  
  const Blog = model("Blog", blogSchema);
  
 module.exports = Blog;