const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
    },
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
  },
  { timestamps: true }
);

orderSchema.pre("validate", function (next) {
  if (this.isNew) this._id = Date.now();
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
