import { VideoList } from "@/components/VideoList";
import { VideoType } from "@prisma/client";

export default function Highlight() {
  return (
    <div>
      <h1>Highlight</h1>
      <div
        style={{
          marginTop: 40,
        }}
      >
        <VideoList type={VideoType.Highlight} />
      </div>
    </div>
  );
}
