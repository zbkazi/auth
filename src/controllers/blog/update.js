const Blog = require('../../models/blog/Blog');
const { blogSchema } = require('../../schemas/blog/blogSchema');
const logger = require('../../utils/logger');

// Update an existing blog
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate update request
    const parsedBody = blogSchema.safeParse(updates);

    if (!parsedBody.success) {
      logger.warn('Blog update validation failed', { errors: parsedBody.error.errors });
      return res.status(400).json({
        success: false,
        message: "Invalid update request",
        errors: parsedBody.error.errors,
      });
    }

    // Check if Blog exists
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      logger.info('Blog not found for update', { blogId: id });
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Update blog
    Object.assign(existingBlog, parsedBody.data);
    await existingBlog.save();

    logger.info('Blog updated successfully', { blogId: existingBlog._id });

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blogId: existingBlog._id,
      data: existingBlog,
    });
  } catch (error) {
    logger.error('Error occurred during blog update', { error: error.message });
    next(error);
  }
};

module.exports = update;
