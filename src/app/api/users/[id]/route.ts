import connectMONGO from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse } from "../../../../../node_modules/next/server";
import { Params } from "../../../../../node_modules/next/dist/shared/lib/router/utils/route-matcher";

export async function PUT(req: Request, { params }: Params) {
  const { id } = params;
  const { newName: name, newContact: contact } = await req.json();

  await connectMONGO();
  await User.findByIdAndUpdate(id, { name, contact });
  return NextResponse.json(
    { message: "User updated successfully" },
    { status: 200 }
  );
}
export async function GET(req: Request, { params }: Params) {
  const { id } = params;
  await connectMONGO();
  const user = await User.findOne({ _id: id });

  return NextResponse.json({ user }, { status: 200 });
}
