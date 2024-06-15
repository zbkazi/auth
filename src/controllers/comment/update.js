const logger = require("../../utils/logger");
const Comment = require("../../models/comment/Comment");
const { commentSchema } = require("../../schemas/comment/CommentSchema");

const update = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Validate request body
    const parsedBody = commentSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
        errors: parsedBody.error.errors,
      });
    }

    // Check if comment exists
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Update comment
    comment.comment = parsedBody.data.comment; // Update any other fields as needed
    await comment.save();

    // Log successful update
    logger.info(`Comment updated successfully: ${id}`);

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      data: comment,
    });
  } catch (error) {
    // Log the error
    logger.error(`Failed to update comment ${id}`, { error: error.message });

    // Handle errors
    res.status(500).json({
      success: false,
      message: "Failed to update comment",
      errors: error.message,
    });
    next(error);
  }
};

module.exports = update;
