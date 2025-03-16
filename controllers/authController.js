const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// TODO: Improve logout
exports.logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logout successful" });
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
};

exports.getFlaggedComments = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("flaggedComments");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ flaggedComments: user.flaggedComments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching flagged comments", error });
  }
};
