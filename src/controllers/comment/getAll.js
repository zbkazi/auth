const Comment = require("../../models/comment/Comment");

const comments = async (req, res, next) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    

    // Fetch paginated comments from the database
    const comments = await Comment.find()
      .skip(skip)
      .limit(limit);

    // Total number of pages
    const totalPages = Math.ceil(await Comment.countDocuments() / limit);

    // Previous page
    const previousPage = page > 1 ? page - 1 : null;

    // Next page
    const nextPage = page < totalPages ? page + 1 : null;

    // Current page
    const currentPage = page;

    

    // Total number of comments
    const totalCount = await Comment.countDocuments();

    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      limit: limit,
      skip: skip,
      previousPage: previousPage,
      nextPage: nextPage,
      totalPages: totalPages,
      page: page,
      totalCount: totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = comments;
