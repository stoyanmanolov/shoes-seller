const express = require("express");
const ordersController = require("../../controllers/orders");
const { adminAuth } = require("../../middleware/auth");

const router = new express.Router();

router.get("/orders/all", adminAuth, ordersController.getOrders);
router.get("/orders/:userId", ordersController.getOrderByUserId);
router.post("/orders", ordersController.addOrder);
router.patch(
  "/orders/complete/:id",
  adminAuth,
  ordersController.markOrderAsComplete
);

module.exports = router;
