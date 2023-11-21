import connectMONGO from "@/libs/mongodb";
import { NextResponse } from "../../../../../node_modules/next/server";
import { Params } from "../../../../../node_modules/next/dist/shared/lib/router/utils/route-matcher";
import Product from "@/models/product";

export async function PUT(req: Request, { params }: Params) {
  const { id } = params;
  const {
    newName: name,
    newPrice: price,
    newSupplier: supplier,
  } = await req.json();

  await connectMONGO();
  // console.log(price, supplier, "terminator");
  await Product.findByIdAndUpdate(id, { name, price, supplier });
  return NextResponse.json(
    { message: "Product updated successfully" },
    { status: 200 }
  );
}
export async function GET(req: Request, { params }: Params) {
  const { id } = params;
  await connectMONGO();
  const product = await Product.findOne({ _id: id });

  return NextResponse.json({ product }, { status: 200 });
}
