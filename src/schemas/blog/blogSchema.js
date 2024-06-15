const { z } = require('zod');

exports.blogSchema = z.object({
  title: z.string().trim().min(2).max(60),
  metaTitle: z.string().trim().min(2).max(60),
  slug: z.string().trim().min(2).max(60),
  description: z.string().trim().min(2),
  image: z.string().trim().url().min(2).max(100),
  views: z.number().int().nonnegative().default(0),
  date: z.date().default(() => new Date()),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});



 exports.querySchema = z.object({
  page: z.string().optional().transform(Number),
  limit: z.string().optional().transform(Number),
  title: z.string().optional(),
  author: z.string().optional(),
  date: z.string().optional(),
});

