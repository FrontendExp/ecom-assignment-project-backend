const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Initialize admin user
const initializeAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ username: "admin" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("password", 10);
      const adminUser = new User({
        username: "admin",
        password: hashedPassword,
      });
      await adminUser.save();
      console.log("Admin user created");
    }
  } catch (error) {
    console.error("Error initializing admin user:", error);
  }
};

// Login function
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout function
const logout = async (req, res) => {
  // For JWT, logout is handled on the client side by removing the token
  res.json({ message: "Logout successful" });
};

module.exports = {
  login,
  logout,
  initializeAdmin,
};
