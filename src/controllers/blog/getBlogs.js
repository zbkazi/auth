

const Blog = require("../../models/blog/Blog");
const getBlogs = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      const blogs = await Blog.find()
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);
  
      const totalBlogs = await Blog.countDocuments();
  
      return res.status(200).json({
        success: true,
        data: {
          blogs,
          pagination: {
            total: totalBlogs,
            page,
            pages: Math.ceil(totalBlogs / limit),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  };



module.exports = getBlogs