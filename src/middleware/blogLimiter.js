const rateLimit = require('express-rate-limit');

// Define a rate limiter for blog creation requests
const BlogLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many blog creation requests from this IP, please try again later.',
});

module.exports = BlogLimiter;
