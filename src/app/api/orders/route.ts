import connectMONGO from "@/libs/mongodb";
import Order from "@/models/order";
import { NextResponse } from "../../../../node_modules/next/server";

export async function POST(req: Request) {
  const { product, user } = await req.json();
  // const {name, title} = await req.json();
  await connectMONGO();
  await Order.create({ product, user });
  // await List.create({name, title})
  return NextResponse.json({ message: "created" }, { status: 201 });
}
export async function GET() {
  await connectMONGO();
  const order = await Order.find().populate("user").populate("product");
  return NextResponse.json({ order });
}

export async function DELETE(req: any) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMONGO();
  await Order.findByIdAndDelete(id);
  return NextResponse.json({ message: "Order deleted" }, { status: 200 });
}
