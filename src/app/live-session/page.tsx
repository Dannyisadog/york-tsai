import { VideoList } from "@/components/VideoList";
import { VideoType } from "@prisma/client";
export default function LiveSession() {
  return (
    <div>
      <h1>Live Session</h1>
      <div
        style={{
          marginTop: 40,
        }}
      >
        <VideoList type={VideoType.LiveSession} />
      </div>
    </div>
  );
}
