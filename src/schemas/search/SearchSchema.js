const {z} = require('zod')


const searchSchema = z.object({
    query: z.string().trim(),
    blogId: z.string().refine((id) => id.match(/^[0-9a-fA-F]{24}$/), {
        message: 'Invalid ObjectId',
    }),
    authorId: z.string().refine((id) => id.match(/^[0-9a-fA-F]{24}$/), {
        message: 'Invalid ObjectId',
    }),
    tag: z.string().min(1).max(10).trim(),
    category: z.string().min(1).max(10).trim(),
    date: z.date().default(() => new Date()),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
});


module.exports = {searchSchema}