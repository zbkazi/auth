const { Schema, model } = require("mongoose");


const FollowSchema = new Schema({
  follower: { type: Schema.Types.ObjectId, ref: "User", required: true },
  following: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

// Index to enforce uniqueness of follower-following pairs
FollowSchema.index({ follower: 1, following: 1 }, { unique: true });

const Follow = model("Follow", FollowSchema);

module.exports = Follow;



const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  // Other user profile information
});
