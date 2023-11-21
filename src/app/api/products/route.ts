// import Product from "@/models/Product";

import connectMONGO from "@/libs/mongodb";
import Product from "@/models/product";
import { NextResponse } from "../../../../node_modules/next/server";

export async function POST(req: Request) {
  const { name, price, supplier } = await req.json();
  // const {name, title} = await req.json();
  await connectMONGO();
  await Product.create({ name, price, supplier });
  // await List.create({name, title})
  return NextResponse.json({ message: "created" }, { status: 201 });
}
export async function GET() {
  await connectMONGO();
  const product = await Product.find();
  return NextResponse.json({ product });
}

export async function DELETE(req: any) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMONGO();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}
