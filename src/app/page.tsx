import { VideoList } from "@/components/VideoList";
import { VideoType } from "@prisma/client";
import styles from "./page.module.css";
export default function Home() {
  return (
    <div>
      <h1 className={styles.page_title}>Commercial</h1>
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
