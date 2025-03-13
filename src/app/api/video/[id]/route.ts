import { deleteVideo, getVideo, updateVideo } from "@/app/services/video.service";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, ctx: any) => {
  const id = ctx.params?.id as string;
  const video = await getVideo(id);
  return NextResponse.json(video);
}

export const PUT = auth(async (req, ctx) => {
  if (!req.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const id = ctx.params?.id as string;
  const video = await updateVideo(id, await req.json());
  return NextResponse.json(video);
}) as any;

export const DELETE = auth(async (req, ctx) => {
  if (!req.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const id = ctx.params?.id as string;
  await deleteVideo(id);
  return NextResponse.json({ message: "Video deleted" });
}) as any
;


