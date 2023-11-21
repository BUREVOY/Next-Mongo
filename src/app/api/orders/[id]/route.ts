import connectMONGO from "@/libs/mongodb";
import { NextResponse } from "../../../../../node_modules/next/server";
import { Params } from "../../../../../node_modules/next/dist/shared/lib/router/utils/route-matcher";
import Order from "@/models/order";

export async function PUT(req: Request, { params }: Params) {
  const { id } = params;
  const { newProduct: product, newUser: user } = await req.json();

  await connectMONGO();
  await Order.findByIdAndUpdate(id, { product, user });
  return NextResponse.json(
    { message: "Order updated successfully" },
    { status: 200 }
  );
}
export async function GET(req: Request, { params }: Params) {
  const { id } = params;
  await connectMONGO();
  const order = await Order.findOne({ _id: id })
    .populate("user")
    .populate("product");

  return NextResponse.json({ order }, { status: 200 });
}
