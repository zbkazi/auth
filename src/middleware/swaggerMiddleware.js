const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// Load the swagger document
const swaggerDocument = YAML.load(path.join(__dirname, '../openapi/blog.yaml'));

// Create the middleware function
const swaggerMiddleware = (app) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
};

module.exports = swaggerMiddleware;
