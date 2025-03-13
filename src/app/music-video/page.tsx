import { VideoList } from "@/components/VideoList";
import { VideoType } from "@prisma/client";
export default function MusicVideo() {
  return (
    <div>
      <h1>Music Video</h1>
      <div
        style={{
          marginTop: 40,
        }}
      >
        <VideoList type={VideoType.MusicVideo} />
      </div>
    </div>
  );
}
