import { VideoList } from "@/components/VideoList";
import { VideoType } from "@prisma/client";
import styles from "../page.module.css";
export default function Concert() {
  return (
    <div>
      <h1 className={styles.page_title}>Concert</h1>
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
