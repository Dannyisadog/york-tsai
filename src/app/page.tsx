import { VideoList } from "@/components/VideoList";
import { VideoType } from "@prisma/client";

export default function Home() {
  return (
    <div>
      <h1>Commercial</h1>
      <div
        style={{
          marginTop: 40,
        }}
      >
        <VideoList type={VideoType.Commercial} />
      </div>
    </div>
  );
}
