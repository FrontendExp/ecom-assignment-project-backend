const express = require("express");

const cartController = require("../controllers/cartController");

const router = express.Router();

router.post("/add", cartController.addToCart);
router.get("/:userId", cartController.getCart);
router.put("/update/:id", cartController.updateCartItem);
router.delete("/delete/:id", cartController.deleteCartItem);
router.delete("/clear/:userId", cartController.clearCart);

module.exports = router;
