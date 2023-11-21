import mongoose from "mongoose";

const connectMONGO = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/InterShop");
    console.log("connected ");
  } catch (err) {
    console.log(err);
  }
};

export default connectMONGO;
