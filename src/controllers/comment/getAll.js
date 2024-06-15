const logger = require("../../utils/logger");
const Comment = require("../../models/comment/Comment");

const getAll = async (req, res, next) => {
  logger.info("Fetching all comments");
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    // Calculate pagination values
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Fetch total count of comments (for pagination metadata)
    const totalComments = await Comment.countDocuments();

    // Log pagination details
    logger.info(`Total comments: ${totalComments}`);
    const totalPages = Math.ceil(totalComments / limit);
    logger.info(`Total pages: ${totalPages}`);
    logger.info(`Current page: ${page}`);
    logger.info(`Limit: ${limit}`);
    logger.info(`Start index: ${startIndex}`);

    // Query comments with pagination and limit
    const comments = await Comment.find().skip(startIndex).limit(limit);

    // Log successful retrieval of comments
    logger.info(`Comments retrieved successfully`, { count: comments.length });

    // Prepare pagination metadata
    const pagination = {
      currentPage: page,
      limit: limit,
      totalItems: totalComments,
    };

    // Add pagination links
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${
      req.path
    }`;
    if (endIndex < totalComments) {
      pagination.nextPage = {
        page: page + 1,
        limit: limit,
        url: `${baseUrl}?page=${page + 1}&limit=${limit}`,
      };
    }
    if (startIndex > 0) {
      pagination.prevPage = {
        page: page - 1,
        limit: limit,
        url: `${baseUrl}?page=${page - 1}&limit=${limit}`,
      };
    }

    // Return success response with comments and pagination metadata
    return res.status(200).json({
      success: true,
      message: "Comments retrieved successfully",
      pagination: pagination,
      data: comments,
    });
  } catch (error) {
    // Log the error
    logger.error("Failed to retrieve comments", { error: error.message });

    // Handle errors
    res.status(500).json({
      success: false,
      message: "Failed to retrieve comments",
      errors: error.message,
    });
    next(error);
  }
};

module.exports = getAll;
