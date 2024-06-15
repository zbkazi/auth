// loggerMiddleware.js
const logger = require('../utils/logger');

// Middleware to log requests
const requestLogger = (req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`, { timestamp: new Date().toISOString() });
  next();
};

// Error handling middleware
const errorLogger = (err, req, res, next) => {
  logger.error(`Error occurred: ${err.message}`, { timestamp: new Date().toISOString(), stack: err.stack });
  res.status(500).json({ error: 'An internal server error occurred' });
};

module.exports = { requestLogger, errorLogger };
