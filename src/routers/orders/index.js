const express = require("express");
const ordersController = require("../../controllers/orders");
const { adminAuth } = require("../../middleware/auth");

const router = new express.Router();

router.get("/orders", adminAuth, ordersController.getOrders);
router.post("/orders", ordersController.addOrder);
router.get("/orders/:userId", ordersController.getOrderByUserId);
router.patch(
  "/orders/complete/:id",
  adminAuth,
  ordersController.markOrderAsComplete
);

module.exports = router;
