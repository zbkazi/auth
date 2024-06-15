const Category = require('../../models/category/Category');

const remove = async (req, res, next) => {
    try {
        // Check if category exists
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // Delete category
        await category.remove();

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });

    } catch (error) {
        next(error);
    }
};

module.exports = remove;
