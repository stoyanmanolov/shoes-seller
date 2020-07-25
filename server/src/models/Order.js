const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
