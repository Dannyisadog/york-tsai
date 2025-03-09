import { VideoList } from "@/components/VideoList";

export default function Home() {
  return (
    <div>
      <h1>Commercial</h1>
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
