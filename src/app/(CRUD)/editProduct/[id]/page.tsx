import EditProductForm from "@/components/EditProduct/editProduct";

const getProductById = async (id: any) => {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditProduct({ params }: any) {
  const { id } = params;
  const { product } = await getProductById(id);
  let { name, price, supplier } = product;
  [supplier] = supplier;
  return (
    <EditProductForm id={id} name={name} price={price} supplier={supplier} />
  );
}
