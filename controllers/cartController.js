const cartData = require("../models/cart");
// Create / Add item to cart
const addToCart = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const item = await cartData.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all items for a specific user
const getCart = async (req, res) => {
  try {
    const items = await cartData.find({ userId: req.params.userId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update quantity
const updateCartItem = async (req, res) => {
  try {
    const updated = await cartData.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete single item
const deleteCartItem = async (req, res) => {
  try {
    console.log("Deleting item with ID:", req.params.id);
    await cartData.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Clear all items for a user
const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    await cartData.deleteMany({ userId });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
};
