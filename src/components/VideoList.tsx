import { listVideos } from "@/app/services/video.service";
import { Box, Typography } from "@mui/material";
import { VideoType } from "@prisma/client";
import Link from "next/link";

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
            }
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
              opacity: 1
            }
          }}
        >
          <Typography variant="h3" sx={{
            padding: 2
          }}>
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
    <ul
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        listStyleType: "none",
        padding: 0,
      }}
    >
      {videos.map((video) => (
        <VideoItem
          key={video.id}
          title={video.title}
          href={`/video/${video.id}`}
          imageUrl={video.cover_image}
        />
      ))}
    </ul>
  );
};
