const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, please login" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user ID to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token, authentication failed" });
  }
};

module.exports = authMiddleware;
