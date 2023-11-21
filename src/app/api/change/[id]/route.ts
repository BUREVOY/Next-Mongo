import connectMONGO from "@/libs/mongodb";
import Item from "@/models/item";
import { NextResponse } from "../../../../../node_modules/next/server";
import { Params } from "../../../../../node_modules/next/dist/shared/lib/router/utils/route-matcher";

export async function PUT(req: Request, { params }: Params) {
  const { id } = params;
  const { newName: name, newDescription: description } = await req.json();

  await connectMONGO();
  await Item.findByIdAndUpdate(id, { name, description });
  return NextResponse.json(
    { message: "Item updated successfully" },
    { status: 200 }
  );
}
export async function GET(req: Request, { params }: Params) {
  const { id } = params;
  await connectMONGO();
  const item = await Item.findOne({ _id: id });

  return NextResponse.json({ item }, { status: 200 });
}
