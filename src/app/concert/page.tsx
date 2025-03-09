import { VideoList } from "@/components/VideoList";

export default function Concert() {
  return (
    <div>
      <h1>Concert</h1>
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
