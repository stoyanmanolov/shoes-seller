const mongoose = require("mongoose");

const shoeSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      default: 1
    },
    sizes: {
      type: Array,
      required: true
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"]
    },
    forKids: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Shoe = mongoose.model("Shoe", shoeSchema);

module.exports = Shoe;
