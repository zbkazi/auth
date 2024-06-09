const { z } = require('zod');

// Define the Category schema using Zod
const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

// Export the schema
module.exports =  { categorySchema };
