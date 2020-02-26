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
    color: {
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
      enum: ["Male", "Female", "Both"]
    },
    forKids: {
      type: Boolean,
      default: false
    },
    frontImage: {
      type: String,
      required: true
    },
    images: {
      type: Array,
      required: true
    }
  },
  { timestamps: true }
);

const Shoe = mongoose.model("Shoe", shoeSchema);

module.exports = Shoe;
