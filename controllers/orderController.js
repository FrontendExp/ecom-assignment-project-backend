const Order = require("../models/order");
const CartItem = require("../models/cart");
const User = require("../models/User");
const nodemailer = require("nodemailer");

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or your email service
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your email password or app password
  },
});

const checkout = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      email,
      firstName,
      lastName,
      address,
      city,
      zipCode,
      cardNumber,
      expiry,
      cvc,
    } = req.body;

    // Get cart items for the user
    const cartItems = await CartItem.find({ userId });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create order
    const order = new Order({
      userId,
      items: cartItems.map((item) => ({
        productName: item.productName,
        productImage: item.productImage,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      shipping: {
        firstName,
        lastName,
        address,
        city,
        zipCode,
        email,
      },
      payment: {
        cardNumber: cardNumber.slice(-4), // Store only last 4 digits for security
        expiry,
        cvc: "***", // Don't store CVC
      },
    });

    await order.save();

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Order Confirmation - Nimble Market Pro",
      html: `
        <h1>Thank you for your order!</h1>
        <p>Order ID: ${order._id}</p>
        <p>Total: $${total.toFixed(2)}</p>
        <h2>Items:</h2>
        <ul>
          ${cartItems
            .map(
              (item) =>
                `<li>${item.productName} - $${item.price} x ${item.quantity}</li>`
            )
            .join("")}
        </ul>
        <p>Shipping to: ${firstName} ${lastName}, ${address}, ${city}, ${zipCode}</p>
        <p>We'll send you updates on your order status.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Clear cart
    await CartItem.deleteMany({ userId });

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id,
      total,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: "Checkout failed", error: error.message });
  }
};

module.exports = {
  checkout,
};
