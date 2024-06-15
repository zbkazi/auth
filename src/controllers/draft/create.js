

const Blog = require("../../models/blog/Blog");
const { blogSchema } = require("../../schemas/blog/blogSchema");
const logger = require("../../utils/logger");

const create = async (req, res, next) => {
  try {
    // Validate request body
    const parsedBody = blogSchema.safeParse(req.body);

    if (!parsedBody.success) {
      logger.warn("Blog creation validation failed", {
        errors: parsedBody.error.errors,
      });
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
        errors: parsedBody.error.errors,
      });
    }

    const blogData = parsedBody.data;

    // Check if Blog already exists
    const existingBlog = await Blog.findOne({ title: blogData.title });
    if (existingBlog) {
      logger.info("Attempt to create a blog with an existing title", {
        title: blogData.title,
      });
      return res.status(400).json({
        success: false,
        message: "Blog already exists",
      });
    }

    // Create new blog
    const blog = new Blog(blogData);
    // Save blog
    await blog.save();

    logger.info("New blog created successfully", {
      blogId: blog._id,
      title: blog.title,
    });

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blogId: blog._id,
      data: blog,
    });
  } catch (error) {
    logger.error("Error occurred during blog creation", {
      error: error.message,
    });
    next(error);
  }
};

module.exports = create;