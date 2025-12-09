const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productImage: String,
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartItem", cartSchema);
