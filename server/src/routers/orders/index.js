const express = require("express");
const Order = require("../../models/Order");

const router = new express.Router();

router.get("/orders", async (req, res) => {
  try {
    await Order.find({}, (err, order) => {
      if (err) throw err;
      res.status(200).send(order);
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

module.exports = router;
