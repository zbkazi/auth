const {z} = require('zod')
const {Types} = require('mongoose')



// Zod schema
exports.blogSchema = z.object({
  authorId: z.instanceof(Types.ObjectId).optional(),
  title: z.string().trim(),
  metaTitle: z.string(),
  slug: z.string(),
  description: z.string(),
  image: z.string(),
  author: z.string(),
  views: z.number().default(0),
  date: z.date().default(() => new Date()),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

