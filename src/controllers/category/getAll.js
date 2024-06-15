const Category = require('../../models/category/Category');

const getAll = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 10; // Number of items per page
        const nextCursor = req.query.next || null; // Cursor for the next page
        const prevCursor = req.query.prev || null; // Cursor for the previous page

        let query = {};
        if (nextCursor) {
            query._id = { $gt: nextCursor };
        } else if (prevCursor) {
            query._id = { $lt: prevCursor };
        }

        // Fetch categories with pagination
        const categories = await Category.find(query)
            .limit(limit)
            .sort({ _id: 1 });

        // Construct next and previous links
        const nextLink = categories.length > 0
            ? `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}?limit=${limit}&next=${categories[categories.length - 1]._id}`
            : null;
        
        const prevLink = categories.length > 0
            ? `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}?limit=${limit}&prev=${categories[0]._id}`
            : null;

        // Return success response with the categories and pagination links
        return res.status(200).json({
            success: true,
            data: categories,
            next: nextLink,
            prev: prevLink
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getAll;
