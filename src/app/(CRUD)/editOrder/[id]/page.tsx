import EditOrderForm from "@/components/EditOrder/editOrder";

const getOrderById = async (id: any) => {
  try {
    const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch order");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditProduct({ params }: any) {
  const { id } = params;
  const { order } = await getOrderById(id);
  let { user, product } = order;

  return <EditOrderForm id={id} user={user._id} product={product._id} />;
}
