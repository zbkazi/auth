const { z } = require('zod');
const { Types } = require('mongoose');



// Zod schema
exports.blogSchema = z.object({
  authorId:z.string().trim().max(100).min(2),
  title: z.string().trim().min(2).max(60),
  metaTitle: z.string().trim().min(2).max(60),
  slug: z.string().trim().min(2).max(60),
  description: z.string().trim().min(2),
  image: z.string().trim().url().min(2).max(100),
  author: z.string().trim().min(2).max(100),
  views: z.number().int().nonnegative().default(0),
  date: z.date().default(() => new Date()),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});
