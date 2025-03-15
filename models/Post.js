const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    image: { type: String, required: true }, // Post image
    caption: { type: String, required: true }, // Caption
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User reference
        username: { type: String, required: true }, // Store username
        text: { type: String, required: true }, // Comment text
        createdAt: { type: Date, default: Date.now }, // Timestamp
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
