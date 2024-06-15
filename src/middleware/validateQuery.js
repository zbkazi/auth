const querySchema = require('../schemas/blog/blogSchema')

const validateQuery = (req, res, next) => {
  try {
    req.query = querySchema.parse(req.query);
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid query parameters', details: err.errors });
  }
};

module.exports = validateQuery;