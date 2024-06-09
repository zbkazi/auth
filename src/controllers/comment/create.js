const Comment = require("../../models/comment/Comment");
const { commentSchema } = require("../../schemas/comment/CommentSchema");

const create = async (req, res, next) => {
    try {

        // validate request body
        const parsedBody = commentSchema.safeParse(req.body);

        if (!parsedBody.success) {
            return res.status(400).json({
              success: false,
              message: "Invalid request body",
              errors: parsedBody.error.errors,
            });
          }

          // check if Comment already exists
        const existingComment = await Comment.findOne({ comment: parsedBody.data.comment });
        if (existingComment) {
          return res.status(400).json({
            success: false,
            message: "Comment already exists",
          });
        }
     


          // create new comment
        const comment = new Comment(parsedBody.data);
        await comment.save();
        

        // Return success response with token
        return res.status(201).json({
            success: true,
            message: "Comment created successfully",
            data: comment
        });
    } catch (error) {
        next(error);
    }
}


module.exports = create;