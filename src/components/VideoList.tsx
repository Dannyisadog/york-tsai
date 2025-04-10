export const fetchCache = "force-no-store";

import { Box, Typography } from "@mui/material";

import Link from "next/link";
import { VideoType } from "@prisma/client";
import { isMobile } from "react-device-detect";
import { listVideos } from "@/app/services/video.service";
import styles from "./style/video.module.css";

interface VideoItemProps {
  title: string;
  href: string;
  imageUrl: string;
}

const VideoItem = (props: VideoItemProps) => {
  const { title, href, imageUrl } = props;
  return (
    <Link href={href}>
      <li
        key={title}
        style={{
          color: "#f0f0f0",
          width: "100%",
          aspectRatio: "16/9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.3s ease-in-out",
            "&:hover": {
              opacity: isMobile ? 0 : 1,
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              padding: 2,
            }}
          >
            {title}
          </Typography>
        </Box>
      </li>
    </Link>
  );
};

interface VideoListProps {
  type: VideoType;
}

export const VideoList = async (props: VideoListProps) => {
  const { type } = props;
  const videos = await listVideos(type);

  return (
    <ul className={styles.video_list}>
      {videos.map((video) => (
        <VideoItem
          key={video.id}
          title={video.title}
          href={`/${video.id}`}
          imageUrl={video.cover_image}
        />
      ))}
    </ul>
  );
};
