import { Box, Container, Typography } from "@mui/material";

import { convertPathToVideoType } from "@/utils";
import { getVideo } from "@/app/services/video.service";
import styles from "./page.module.css";

interface VideoPageProps {
  params: Promise<{ video_type: string; slug: string }>;
}

export default async function VideoPage(props: VideoPageProps) {
  const { params } = props;
  const { video_type, slug } = await params;
  const videoId = slug[0];
  const videoType = convertPathToVideoType(video_type);
  const videoData = await getVideo(videoId, videoType);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
        }}
      >
        {videoData.title}
      </Typography>

      <Box sx={{ mb: 4, position: "relative", paddingTop: "56.25%" }}>
        <Box
          component="iframe"
          src={videoData.youtube_link}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: 1,
            border: "none",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ whiteSpace: "pre-wrap", color: "white" }}
        >
          {videoData.description}
        </Typography>
      </Box>

      <Box>
        <ul className={styles.image_list}>
          {videoData.images.map((image, index) => (
            <li key={index}>
              <Box
                component="img"
                sx={{
                  width: "100%",
                  objectFit: "cover",
                  aspectRatio: 16 / 9,
                  borderRadius: 1,
                }}
                src={image.image_url}
                alt={`Related image ${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </Box>
    </Container>
  );
}
