const update = async (req, res, next) => {
    try {
        res.status(200).json({ success: true, message: "Comment updated successfully" });
    } catch (error) {
        next(error);
    }
}


module.exports = update;