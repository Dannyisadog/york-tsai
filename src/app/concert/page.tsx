import { VideoList } from "@/components/VideoList";
import { VideoType } from "@prisma/client";
export default function Concert() {
  return (
    <div>
      <h1>Concert</h1>
      <div
        style={{
          marginTop: 40,
        }}
      >
        <VideoList type={VideoType.Concert} />
      </div>
    </div>
  );
}
