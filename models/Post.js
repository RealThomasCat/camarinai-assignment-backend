const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    caption: { type: String, required: true },
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: { type: String, required: true },
        text: { type: String, required: true },
        isFlagged: { type: Boolean, default: false }, // Mark flagged comments
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
