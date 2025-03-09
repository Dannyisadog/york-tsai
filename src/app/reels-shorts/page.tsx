import { VideoList } from "@/components/VideoList";

export default function Highlight() {
  return (
    <div>
      <h1>Reels & Shorts</h1>
      <div
        style={{
          marginTop: 40,
        }}
      >
        <VideoList />
      </div>
    </div>
  );
}
