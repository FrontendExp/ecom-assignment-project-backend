const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

// Public routes
router.get("/", productController.getAllProducts);
router.get("/slug/:slug", productController.getProductBySlug);
router.get("/:id", productController.getProductById);
router.get("/categories", productController.getCategories);

// Admin routes (would need authentication middleware)
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
