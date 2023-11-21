// import Item from "@/models/item";
import List from "@/models/item";
import connectMONGO from "@/libs/mongodb";
import { NextResponse } from "../../../../node_modules/next/server";
import Item from "@/models/item";

export async function POST(req: Request) {
  const { name, description } = await req.json();
  // const {name, title} = await req.json();
  await connectMONGO();
  await Item.create({ name, description });
  // await List.create({name, title})
  return NextResponse.json({ message: "created" }, { status: 201 });
}
export async function GET() {
  await connectMONGO();
  const item = await Item.find();
  return NextResponse.json({ item });
}

export async function DELETE(req: any) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMONGO();
  await Item.findByIdAndDelete(id);
  return NextResponse.json({ message: "item deleted" }, { status: 200 });
}
