import mongoose from "mongoose";
export type ItemType = {
  name: string;
  description: string;
  _id: any;
};

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

let Item = mongoose.models.Item || mongoose.model("Item", itemSchema);

export default Item;

// const listSchema = new mongoose.Schema({
//     name: String,
//     title: String,
//   });

//   const List = mongoose.model('List', listSchema);

//   export default List;
