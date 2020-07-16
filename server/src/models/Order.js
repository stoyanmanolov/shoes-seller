const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shoes: {
    type: Array,
    required: true,
  },
  sum: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
