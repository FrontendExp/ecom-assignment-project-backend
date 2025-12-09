const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.post("/checkout/:userId", orderController.checkout);

module.exports = router;
