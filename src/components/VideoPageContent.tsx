"use client";

import { Box, Container, Typography } from "@mui/material";

import { ContainedButton } from "@/components/ContainedButton";
import { EditVideoModal } from "@/components/EditVideoModal";
import Gallery from "@/components/Gallery";
import styles from "../app/[...slug]/page.module.css";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface VideoPageContentProps {
  videoData: {
    id: string;
    title: string;
    description: string;
    youtube_link: string;
    video_type: string;
    cover_image: string;
    images: Array<{
      id: string;
      image_url: string;
      order: number;
    }>;
  };
}

export const VideoPageContent = ({ videoData }: VideoPageContentProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const { data: session } = useSession();

  return (
    <Container sx={{ py: 4 }}>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "bold",
            }}
          >
            {videoData.title}
          </Typography>
          {session && (
            <ContainedButton onClick={() => setIsEditModalOpen(true)}>
              編輯影片
            </ContainedButton>
          )}
        </Box>

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
      </Container>

      <Box>
        <ul className={styles.image_list}>
          {videoData.images.map((image, index) => (
            <li
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              style={{ cursor: "pointer" }}
            >
              <Box
                component="img"
                sx={{
                  width: "100%",
                  objectFit: "cover",
                  aspectRatio: 16 / 9,
                  borderRadius: 1,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
                src={image.image_url}
                alt={`Related image ${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </Box>

      {selectedImageIndex !== null && (
        <Gallery
          images={videoData.images.map((img) => img.image_url)}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}

      <EditVideoModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        videoData={videoData}
      />
    </Container>
  );
};
