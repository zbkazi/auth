const Comment = require("../../models/comment/Comment");

const remove = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract comment ID from request parameters

    // Check if the comment exists
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Delete the comment
    await Comment.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
