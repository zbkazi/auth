const Blog = require('../../models/blog/Blog');
const logger = require('../../utils/logger');

// Get blogs with pagination and search
const getBlogByParams = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const searchCriteria = {};
    if (req.query.title) searchCriteria.title = new RegExp(req.query.title, 'i');
    if (req.query.author) searchCriteria.author = new RegExp(req.query.author, 'i');
    if (req.query.date) {
      const dateFilter = new Date(req.query.date);
      searchCriteria.date = { $gte: dateFilter.setHours(0, 0, 0, 0), $lt: dateFilter.setHours(23, 59, 59, 999) };
    }

    const totalBlogs = await Blog.countDocuments(searchCriteria);
    const blogs = await Blog.find(searchCriteria).skip(skip).limit(limit);

    const totalPages = Math.ceil(totalBlogs / limit);
    const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?').shift()}`;
    const buildLink = (page, limit) => `${baseUrl}?page=${page}&limit=${limit}`;

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

    logger.info(`Blogs retrieved successfully`, { pagination });
    res.status(200).json({ pagination, blogs });
  } catch (err) {
    logger.error('Error occurred while fetching blogs', { error: err.message });
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

module.exports = getBlogByParams;
