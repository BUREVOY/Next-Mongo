import mongoose from "mongoose";

export type ProductsType = {
  _id: any;
  name: string;
  price: number;
  supplier: {
    company: string;
    remainings: number;
  }[];
};
const supplierSchema = new mongoose.Schema({
  company: String,
  remainings: Number,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  supplier: [supplierSchema],
});

export let Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

const groupDataByPrice = async () => {
  try {
    const result = await Product.aggregate([
      {
        $project: {
          name: 1, //оставляем
          price: 1,
          priceRange: {
            $switch: {
              branches: [
                { case: { $lte: ["$price", 30] }, then: "Дешево" }, //если меньше
                { case: { $lte: ["$price", 80] }, then: "Средне" },
              ],
              default: "Дорого",
            },
          },
        },
      },
      {
        $group: {
          _id: "$priceRange",
          products: {
            $push: {
              name: "$name",
              price: "$price",
            },
          },
        },
      },
    ]);

    // Распечатываем результат более читаемым образом
    result.forEach((group: any) => {
      console.log(`Группа цен: ${group._id}`);
      group.products.forEach((product: any) => {
        console.log(`  Продукт: ${product.name}, Цена: ${product.price}`);
      });
    });
  } catch (error) {
    console.error("Error during aggregatio:", error);
  }
};

// Вызов функции для группировки данных по цене
groupDataByPrice();

export default Product;
