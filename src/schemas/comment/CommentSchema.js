const { z } = require("zod");

// Define the Zod schema for comments
const commentSchema = z.object({
  comment: z.string().trim(),
  date: z.date().default(() => new Date()),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Export the Zod schema
module.exports = {
  commentSchema,
};
