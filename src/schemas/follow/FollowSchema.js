const { z } = require("zod");

// Define Zod schema for Follow
exports.FollowSchema = z.object({
  follower: z.string().uuid(), // Assuming follower and following IDs are UUIDs
  following: z.string().uuid(),
});
