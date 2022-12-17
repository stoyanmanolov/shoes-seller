const Order = require("../../models/Order");

const getOrders = async (req, res) => {
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
};

const getOrderByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const order = await Order.findById({ userId });
    if (!order) {
      res.sendStatus(404);
    } else res.status(200).send(order);
  } catch (e) {
    res.status(400).send(e);
  }
};

const addOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};

const markOrderAsComplete = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) throw new Error(`No order with id: ${req.params.id} found.`);
    order.completed = true;
    await order.save();

    res.status(200).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getOrders,
  getOrderByUserId,
  addOrder,
  markOrderAsComplete,
};
