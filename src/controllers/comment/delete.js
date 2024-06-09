const deletes = async (req, res, next) => {
    try {
        res.status(200).json({ success: true, message: "Comment created successfully" });
    } catch (error) {
        next(error);
    }
}


module.exports = deletes;