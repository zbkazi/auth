const User = require("../../models/User");
const {userSchema} = require("../../schemas/userSchema.ts");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const authUser = async (req, res, next) => {
    try {
        // validate request body
        const parsedBody = userSchema.safeParse(req.body);

        if (!parsedBody.success) {
            return res.status(400).json({
              success: false,
              message: "Invalid request body",
              errors: parsedBody.error.errors,
            });
          }


        // check if User already exists
        const existingUser = await User.findOne({ username: parsedBody.data.username });
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "User already exists",
          });
        }   


        // hash password
        const salt = await bcrypt.genSalt(10);
        parsedBody.data.password = await bcrypt.hash(parsedBody.data.password, salt);

        // token for user

        const token = jwt.sign({ username: parsedBody.data.username }, process.env.JWT_SECRET || 'secret-key', {
            expiresIn: "1h",
        });
        

        // create new User
        const user = new User(parsedBody.data);
        await user.save();


        // Return success response with token
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
            token,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = authUser;