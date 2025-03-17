
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const POST = auth(async (req) => {
  if (!req.auth || !req.auth.user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/");
  revalidatePath("/music-video");
  revalidatePath("/live-session");
  revalidatePath("/concert");
  revalidatePath("/highlight");
  revalidatePath("/reels-shorts");

  return Response.json({ message: "Cache revalidated" }, { status: 200 });
}) as any;
