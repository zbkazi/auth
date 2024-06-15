const Blog = require('../../models/blog/Blog');
const logger = require('../../utils/logger');

// Delete a blog by ID
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if Blog exists
    const blog = await Blog.findById(id);
    if (!blog) {
      logger.info('Blog not found for deletion', { blogId: id });
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Perform deletion
    await Blog.findByIdAndDelete(id);

    logger.info('Blog deleted successfully', { blogId: id });

    // Return success response
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      blogId: id,
    });
  } catch (error) {
    logger.error('Error occurred during blog deletion', { error: error.message });
    next(error);
  }
};

module.exports = remove;
