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
    outOfStock: {
      type: Boolean,
      default: false
    },
    // Men, Women, Kids
    forWho: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Kids"]
    }
  },
  { timestamps: true }
);

const Shoe = mongoose.model("Shoe", shoeSchema);

module.exports = Shoe;
