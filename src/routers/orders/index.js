const express = require("express");
const Order = require("../../models/Order");
const { adminAuth } = require("../../middleware/auth");

const router = new express.Router();

router.get("/orders/all", adminAuth, async (req, res) => {
  try {
    await Order.find({})
      .sort({ completed: 1 })
      .exec((err, orders) => {
        if (err) throw err;
        res.status(200).send(orders);
      });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/orders", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/orders/complete/:id", adminAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) throw new Error(`No order with id: ${req.params.id} found.`);
    order.completed = true;
    await order.save();

    res.status(200).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
