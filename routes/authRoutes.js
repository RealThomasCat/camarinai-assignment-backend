const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getCurrentUser,
  getFlaggedComments,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", authMiddleware, getCurrentUser); // Protected route
router.get("/notifications", authMiddleware, getFlaggedComments); // Protected route

module.exports = router;
