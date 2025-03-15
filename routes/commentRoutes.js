const express = require("express");
const { addComment } = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addComment); // Protected route

module.exports = router;
