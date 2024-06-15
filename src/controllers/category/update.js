const Category = require('../../models/category/Category');
const { categorySchema } = require('../../schemas/category/CategorySchema');

const update = async (req, res, next) => {
    try {
        // Validate request body
        const parsedBody = categorySchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid request body",
                errors: parsedBody.error.errors,
            });
        }

        // Check if category exists
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // Update category with new data
        Object.assign(category, parsedBody.data);
        await category.save();

        // Return success response with the updated category
        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category
        });

    } catch (error) {
        next(error);
    }
};

module.exports = update;
