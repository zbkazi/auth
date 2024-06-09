const { z } = require('zod');

// Define the Zod schema for comments
const commentSchema = z.object({
  blog: z.string().refine((id) => id.match(/^[0-9a-fA-F]{24}$/), {
    message: 'Invalid ObjectId',
  }),
  author: z.string().refine((id) => id.match(/^[0-9a-fA-F]{24}$/), {
    message: 'Invalid ObjectId',
  }),
  comment: z.string().trim(),
  date: z.date().default(() => new Date()),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

// Export the Zod schema
module.exports = {
  commentSchema
};
