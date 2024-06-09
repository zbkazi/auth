const Comment = require("../../models/comment/Comment");
const { commentSchema } = require("../../schemas/comment/CommentSchema");

const create = async (req, res, next) => {
    try {
        res.status(200).json({ success: true, message: "Comment created successfully" });
    } catch (error) {
        next(error);
    }
}


module.exports = create;