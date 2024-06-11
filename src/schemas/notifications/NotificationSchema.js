const {z} = require('zod')


const notificationSchema = z.object({
    sender: z.string().refine((id) => id.match(/^[0-9a-fA-F]{24}$/), {
        message: 'Invalid ObjectId',
    }),
    receiver: z.string().refine((id) => id.match(/^[0-9a-fA-F]{24}$/), {
        message: 'Invalid ObjectId',
    }),
    blog: z.string().refine((id) => id.match(/^[0-9a-fA-F]{24}$/), {
        message: 'Invalid ObjectId',
    }),
    comment: z.string().refine((id) => id.match(/^[0-9a-fA-F]{24}$/), {
        message: 'Invalid ObjectId',
    }),
    type: z.string().refine((type) => type.match(/^(like|comment|follow)$/), {
        message: 'Invalid type',
    }),
    date: z.date().default(() => new Date()),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
    })


module.exports = {notificationSchema}