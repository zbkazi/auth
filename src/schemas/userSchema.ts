const z = require("zod");


const userSchema = z.object({
  firstName: z.string().min(2).max(10).trim(),
  middleName: z.string().min(2).max(10).trim().nullable(),
  lastName: z.string().min(2).max(10).trim(),
  username: z.string().min(2).max(10).trim(),
  gender: z.string().trim(),
  dateOfBirth: z.string().trim(),
  phoneNumber: z.string().min(11).max(12),
  address: z.string().min(2).max(100),
  image: z.string().min(2).max(100),
  status: z.string().default('active'),
  email: z.string().email(),
  password: z.string().min(2).max(224),
});




module.exports = {userSchema}