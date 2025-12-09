const express = require("express");
const {
  login,
  logout,
  initializeAdmin,
} = require("../controllers/authController");

const router = express.Router();

// Initialize admin user on startup
initializeAdmin();

// Routes
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
