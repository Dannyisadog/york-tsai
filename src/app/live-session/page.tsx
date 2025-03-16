export const fetchCache = "force-no-store";

import { VideoList } from "@/components/VideoList";
import { VideoType } from "@prisma/client";
import styles from "../page.module.css";
export default function LiveSession() {
  return (
    <div>
      <h1 className={styles.page_title}>Live Session</h1>
      <div
        style={{
          marginTop: 40,
        }}
      >
        <VideoList type={VideoType.LiveSession} />
      </div>
    </div>
  );
}
