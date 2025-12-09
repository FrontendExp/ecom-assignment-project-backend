require("dotenv").config();
const express = require("express");
const cors = require("cors");

// DB
const connectDB = require("./config/db");

// Routes
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/", cartRoutes);
app.use("/auth", authRoutes);
app.use("/order", orderRoutes);
app.use("/products", productRoutes);

module.exports = app;

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
