const Post = require("../models/Post");
const User = require("../models/User");

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

    // Add comment with username
    const newComment = {
      userId: user._id,
      username: user.username, // Include username
      text,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};
