import mongoose from "mongoose";

export type OrdersType = {
  _id: any;
  product: any;
  user: any;
};

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

export let Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
