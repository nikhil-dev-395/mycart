import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    imageUrl: { type: String, min: 2, required: true },
    price: { type: Number, required: true, default: 0 },
    description: {
      type: String,
      required: true,
      default: "nothing new about this product",
    },
  },
  { timestamps: true },
);

const Cart = mongoose.model("Cart", CartSchema);

export { Cart };
