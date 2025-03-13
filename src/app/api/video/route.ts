import { auth } from "@/auth";
import { createVideo, listVideos } from "@/app/services/video.service";
import { NextResponse } from "next/server";

export const GET = auth(async () => {
  const videos = await listVideos();
  return NextResponse.json(videos);
}) as any;

export const POST = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const video = await createVideo(await req.json());
  return NextResponse.json(video);
}) as any;
