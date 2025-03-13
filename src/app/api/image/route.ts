import { uploadImage } from "@/app/services/upload-image.service";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const POST = auth(async (req) => {
  if (!req.auth || !req.auth.user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const image = formData.get('image') as File;
  const uploadObjectResp = await uploadImage(image);
  return NextResponse.json(uploadObjectResp);
}) as any;