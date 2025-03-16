const Post = require("../models/Post");
const User = require("../models/User");
const { moderateText } = require("../utils/moderation");

exports.addComment = async (req, res) => {
  try {
    const { postId, text } = req.body;

    if (!postId || !text) {
      return res
        .status(400)
        .json({ message: "Post ID and comment text are required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // **Moderate the comment using Google Cloud NLP**
    const isFlagged = await moderateText(text);

    const newComment = {
      userId: user._id,
      username: user.username,
      text,
      isFlagged, // Store flagged status
      createdAt: new Date(),
    };

    // **Store comment in post (flagged or not)**
    post.comments.push(newComment);
    await post.save();

    // **If flagged, store it separately in user flagged comments**
    if (isFlagged) {
      user.flaggedComments.push({
        postId,
        text,
        createdAt: new Date(),
      });

      await user.save();
    }

    res.status(201).json({
      message: isFlagged
        ? "Comment posted but flagged for review"
        : "Comment posted successfully",
      comment: newComment,
      flagged: isFlagged,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};
