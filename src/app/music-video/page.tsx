import { VideoList } from "@/components/VideoList";
import { VideoType } from "@prisma/client";
import styles from "../page.module.css";
export default function MusicVideo() {
  return (
    <div>
      <h1 className={styles.page_title}>Music Video</h1>
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
