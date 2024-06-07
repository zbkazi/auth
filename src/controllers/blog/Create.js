const Blog = require('../../models/Blog')
const {blogSchema} = require('../../schemas/blogSchema')




const createBlog = async (req, res, next) => {
    try {
        // validate request body
        const parsedBody = blogSchema.safeParse(req.body);

        if (!parsedBody.success) {
            return res.status(400).json({
              success: false,
              message: "Invalid request body",
              errors: parsedBody.error.errors,
            });
          }

           // check if Blog already exists
    const existingBlog = await Blog.findOne({ email: parsedBody.data.title });
    if (existingBlog) {
      return res.status(400).json({
        success: false,
        message: "Blog already exists",
      });
    }


    // save db

// Return success response with token
return res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });


    } catch (error) {
        next(error)
    }
}



module.exports = createBlog;