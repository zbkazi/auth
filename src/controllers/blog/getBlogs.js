const Blog = require('../../models/blog/Blog'); // Assuming you have a Blog model
const logger = require('../../utils/logger');



// Controller for getting blogs with pagination links
const getBlog = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const totalBlogs = await Blog.countDocuments();
    const blogs = await Blog.find().skip(skip).limit(limit);

    const totalPages = Math.ceil(totalBlogs / limit);

    // Base URL for constructing pagination links
     const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?').shift()}`;

    // Helper function to build query string for pagination links
    const buildLink = (page, limit) => `${baseUrl}?page=${page}&limit=${limit}`;

    const pagination = {
      totalBlogs,
      totalPages,
      currentPage: page,
      limit,
      totalPageLink: buildLink(1, limit),
      pageLink: buildLink(page, limit),
      previousLink: page > 1 ? buildLink(page - 1, limit) : null,
      nextLink: page < totalPages ? buildLink(page + 1, limit) : null,
      skipLink: skip > 0 ? buildLink(page, limit) : null,
      limitLink: limit ? buildLink(page, limit) : null
    };

    res.status(200).json({ pagination,blogs });
  } catch (err) {
    logger.error('Error occurred while fetching blogs', { error: err.message });
    res.status(500).json({ error: err.message });
  }
};


module.exports = getBlog;



