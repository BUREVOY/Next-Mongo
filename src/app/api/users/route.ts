import connectMONGO from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "../../../../node_modules/next/server";

export async function POST(req: any) {
  const { name, contact } = await req.json();
  // const {name, title} = await req.json();
  await connectMONGO();
  await User.create({ name, contact });
  // await List.create({name, title})
  return NextResponse.json({ message: "created" }, { status: 201 });
}
export async function GET() {
  await connectMONGO();
  const user = await User.find();
  return NextResponse.json({ user });
}

export async function DELETE(req: any) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMONGO();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
