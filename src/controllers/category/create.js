const Category = require('../../models/category/Category');
const { categorySchema } = require('../../schemas/category/CategorySchema');

const create = async (req, res, next) => {
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

        // Check if category already exists
        const existingCategory = await Category.findOne({ name: parsedBody.data.name });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category already exists",
            });
        }

        // Create new category
        const category = new Category(parsedBody.data);
        await category.save();

        // Return success response
        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category
        });

    } catch (error) {
        next(error);
    }
};

module.exports = create;
