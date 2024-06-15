const Comment = require("../../models/comment/Comment");
const { commentSchema } = require("../../schemas/comment/CommentSchema");

const validateRequestBody = (body) => {
  const parsedBody = commentSchema.safeParse(body);
  if (!parsedBody.success) {
    const error = new Error("Invalid request body");
    error.status = 400;
    error.details = parsedBody.error.errors;
    throw error;
  }
  return parsedBody.data;
};

const checkIfCommentExists = async (commentText) => {
  const existingComment = await Comment.findOne({ comment: commentText });
  if (existingComment) {
    const error = new Error("Comment already exists");
    error.status = 400;
    throw error;
  }
};

const createComment = async (data) => {
  const comment = new Comment(data);
  await comment.save();
  return comment;
};

const create = async (req, res, next) => {
  try {
    const requestBody = validateRequestBody(req.body);
    await checkIfCommentExists(requestBody.comment);
    const newComment = await createComment(requestBody);

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: newComment,
    });
  } catch (error) {
    if (!error.status) error.status = 500;
    res.status(error.status).json({
      success: false,
      message: error.message,
      errors: error.details || [],
    });
    next(error);
  }
};

module.exports = create;
