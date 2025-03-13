import { VideoList } from "@/components/VideoList";
import { VideoType } from "@prisma/client";
export default function Highlight() {
  return (
    <div>
      <h1>Reels & Shorts</h1>
      <div
        style={{
          marginTop: 40,
        }}
      >
        <VideoList type={VideoType.ReelsAndShorts} />
      </div>
    </div>
  );
}
