import mongoose from "mongoose";

export type UsersType = {
  _id: any;
  name: string;
  contact: string;
};
const userSchema = new mongoose.Schema({
  name: String,
  contact: String,
});

export let User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
