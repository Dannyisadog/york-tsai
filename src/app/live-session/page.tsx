import { VideoList } from "@/components/VideoList";

export default function LiveSession() {
  return (
    <div>
      <h1>Live Session</h1>
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
