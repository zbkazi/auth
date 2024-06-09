const Comment = require("../../models/comment/Comment");

const update = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract comment ID from request parameters
    const { comment: updatedComment } = req.body; // Extract updated comment from request body

    // Check if the comment exists
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Update the comment
    comment.comment = updatedComment;
    await comment.save();

    res.status(200).json({
      success: true,
      data: comment,
      message: "Comment updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = update;
