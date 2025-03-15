const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

// GET /api/posts - Fetch all posts with comments
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().lean();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
});

module.exports = router;
