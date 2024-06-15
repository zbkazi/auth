const Blog = require('../../models/blog/Blog');
const logger = require('../../utils/logger');

// Search for blogs by keyword in title or slug
const search = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const keyword = req.query.keyword;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Keyword parameter is required",
      });
    }

    const searchCriteria = {
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { slug: { $regex: keyword, $options: 'i' } }
      ]
    };

    const totalBlogs = await Blog.countDocuments(searchCriteria);
    const blogs = await Blog.find(searchCriteria).skip(skip).limit(limit);

    const totalPages = Math.ceil(totalBlogs / limit);
    const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?').shift()}`;
    const buildLink = (page, limit) => `${baseUrl}?page=${page}&limit=${limit}&keyword=${keyword}`;

    const pagination = {
      totalBlogs,
      totalPages,
      currentPage: page,
      limit,
      firstPageLink: buildLink(1, limit),
      currentPageLink: buildLink(page, limit),
      previousPageLink: page > 1 ? buildLink(page - 1, limit) : null,
      nextPageLink: page < totalPages ? buildLink(page + 1, limit) : null,
      lastPageLink: buildLink(totalPages, limit),
    };

    logger.info(`Blogs retrieved successfully for keyword '${keyword}'`, { pagination });
    res.status(200).json({ pagination, blogs });
  } catch (error) {
    logger.error('Error occurred while searching blogs', { error: error.message });
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

module.exports = search;
