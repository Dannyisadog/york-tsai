import { NextRequest, NextResponse } from "next/server";
import {
  deleteVideo,
  getVideo,
  updateVideo,
} from "@/app/services/video.service";

import { auth } from "@/auth";
import { convertPathToVideoType } from "@/utils";

export const GET = async (req: NextRequest, ctx: any) => {
  const id = ctx.params?.id as string;
  const video_type = ctx.params?.video_type as string;

  const videoType = convertPathToVideoType(video_type);

  const video = await getVideo(id, videoType);
  return NextResponse.json(video);
};

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
}) as any;
