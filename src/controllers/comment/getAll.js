const comments = async (req, res, next) => {
    try {
        res.status(200).json({ success: true, message: "Get all Comment  successfully" });
    } catch (error) {
        next(error);
    }
}


module.exports = comments;