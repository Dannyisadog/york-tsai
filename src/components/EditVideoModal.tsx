"use client";

import { Box, FormControl, Grid, Stack, Typography } from "@mui/material";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { clearCache, updateVideo } from "@/api/video";
import { useEffect, useState } from "react";

import { CSS } from "@dnd-kit/utilities";
import { ContainedButton } from "./ContainedButton";
import { Modal } from "./Modal";
import { OutlinedButton } from "./OutlinedButton";
import { Select } from "./Select";
import { TextField } from "./TextField";
import { UploadImageBox } from "./UploadImageBox";
import { VideoType } from "@prisma/client";
import { getPar } from "@/api/par";

const items = Object.values(VideoType).map((type) => ({
  value: type,
  label: type,
}));

interface EditVideoModalProps {
  open: boolean;
  onClose: () => void;
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

export const EditVideoModal = ({
  open,
  onClose,
  videoData,
}: EditVideoModalProps) => {
  const [titleError, setTitleError] = useState<string | undefined>(undefined);
  const [coverImageError, setCoverImageError] = useState<string | undefined>(
    undefined
  );
  const [youtubeLinkError, setYoutubeLinkError] = useState<string | undefined>(
    undefined
  );

  const [par, setPar] = useState<string | undefined>(undefined);
  const [bucketUrl, setBucketUrl] = useState<string | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: videoData.title,
    description: videoData.description,
    youtube_link: videoData.youtube_link,
    video_type: videoData.video_type as VideoType,
    thumbnail: videoData.cover_image,
    related_images: videoData.images.map((image) => ({
      url: image.image_url,
      order: image.order,
    })),
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleRemoveRelatedImage = (index: number) => {
    setFormData({
      ...formData,
      related_images: formData.related_images.filter((_, i) => i !== index),
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = formData.related_images.findIndex(
        (_, index) => `image-${index}` === active.id
      );
      const newIndex = formData.related_images.findIndex(
        (_, index) => `image-${index}` === over.id
      );

      const newRelatedImages = arrayMove(
        formData.related_images,
        oldIndex,
        newIndex
      );
      const updatedRelatedImages = newRelatedImages.map((image, index) => ({
        ...image,
        order: index,
      }));

      setFormData({
        ...formData,
        related_images: updatedRelatedImages,
      });
    }
  };

  const SortableItem = ({
    id,
    image,
    index,
  }: {
    id: string;
    image: { url: string; order: number };
    index: number;
  }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition: transition || "transform 200ms ease, box-shadow 200ms ease",
      zIndex: isDragging ? 1 : 0,
      opacity: isDragging ? 0.8 : 1,
      cursor: "grab",
      transformOrigin: "center center",
      "&:active": {
        cursor: "grabbing",
      },
      "&:hover": {
        transform: isDragging ? undefined : "scale(1.02)",
        boxShadow: isDragging
          ? "0 8px 16px rgba(0,0,0,0.1)"
          : "0 4px 8px rgba(0,0,0,0.1)",
      },
    };

    return (
      <Box
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        sx={{
          transition: "all 0.2s ease",
          transformOrigin: "center center",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          },
          "&:active": {
            cursor: "grabbing",
          },
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
        }}
      >
        {par && bucketUrl && (
          <UploadImageBox
            par={par}
            bucketUrl={bucketUrl}
            title="相關圖片"
            imageUrl={image.url}
            onRemove={() => handleRemoveRelatedImage(index)}
            onUploaded={(imageUrl) => {
              setFormData({
                ...formData,
                related_images: [
                  ...formData.related_images,
                  { url: imageUrl, order: formData.related_images.length },
                ],
              });
            }}
          />
        )}
      </Box>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setTitleError(formData.title ? undefined : "標題不能為空");
    setCoverImageError(formData.thumbnail ? undefined : "封面縮圖不能為空");
    setYoutubeLinkError(
      formData.youtube_link ? undefined : "YouTube 連結不能為空"
    );

    if (!formData.title || !formData.thumbnail || !formData.youtube_link) {
      return;
    }

    e.preventDefault();
    setIsLoading(true);
    await updateVideo(videoData.id, {
      title: formData.title,
      description: formData.description,
      youtubeLink: formData.youtube_link,
      coverImage: formData.thumbnail,
      videoType: formData.video_type,
      relatedImages: formData.related_images,
    });
    onClose();
    setIsLoading(false);
    await clearCache();
    window.location.reload();
  };

  useEffect(() => {
    if (open) {
      setFormData({
        title: videoData.title,
        description: videoData.description,
        youtube_link: videoData.youtube_link,
        video_type: videoData.video_type as VideoType,
        thumbnail: videoData.cover_image,
        related_images: videoData.images.map((image) => ({
          url: image.image_url,
          order: image.order,
        })),
      });
      setTitleError(undefined);
      setCoverImageError(undefined);
      setYoutubeLinkError(undefined);
    }
  }, [open, videoData]);

  useEffect(() => {
    if (!open) {
      setPar(undefined);
    }
  }, [open]);

  useEffect(() => {
    if (!open || par) return;
    const fetchPar = async () => {
      const data = await getPar();
      setPar(data.parUrl);
      setBucketUrl(data.bucketUrl);
    };
    fetchPar();
  }, [open, par]);

  if (!par || !bucketUrl) return null;

  return (
    <Modal
      title="編輯影片"
      open={open}
      onClose={onClose}
      aria-labelledby="edit-video-modal"
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="標題"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            error={titleError}
          />
          <TextField
            label="描述"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            multiline
            rows={4}
          />
          <TextField
            label="YouTube 連結"
            value={formData.youtube_link}
            onChange={(e) =>
              setFormData({ ...formData, youtube_link: e.target.value })
            }
            error={youtubeLinkError}
          />
          <FormControl>
            <Select
              label="影片類型"
              value={formData.video_type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  video_type: e.target.value as VideoType,
                })
              }
              items={items}
            />
          </FormControl>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              封面縮圖
            </Typography>
            {par && bucketUrl && (
              <UploadImageBox
                par={par}
                bucketUrl={bucketUrl}
                title="封面縮圖"
                imageUrl={formData.thumbnail}
                onUploaded={(imageUrl) =>
                  setFormData({ ...formData, thumbnail: imageUrl })
                }
              />
            )}
            {coverImageError && (
              <Typography color="error" variant="caption">
                {coverImageError}
              </Typography>
            )}
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              相關圖片
            </Typography>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={formData.related_images.map(
                  (_, index) => `image-${index}`
                )}
                strategy={rectSortingStrategy}
              >
                <Grid container spacing={2}>
                  {formData.related_images.map((image, index) => (
                    <Grid item xs={6} key={`image-${index}`}>
                      <SortableItem
                        id={`image-${index}`}
                        image={image}
                        index={index}
                      />
                    </Grid>
                  ))}
                  <Grid item xs={6}>
                    <UploadImageBox
                      par={par}
                      bucketUrl={bucketUrl}
                      title="新增相關圖片"
                      onUploaded={(imageUrl) => {
                        setFormData({
                          ...formData,
                          related_images: [
                            ...formData.related_images,
                            {
                              url: imageUrl,
                              order: formData.related_images.length,
                            },
                          ],
                        });
                      }}
                    />
                  </Grid>
                </Grid>
              </SortableContext>
            </DndContext>
          </Box>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <OutlinedButton onClick={onClose}>取消</OutlinedButton>
            <ContainedButton type="submit" disabled={isLoading}>
              {isLoading ? "儲存中..." : "儲存"}
            </ContainedButton>
          </Box>
        </Stack>
      </form>
    </Modal>
  );
};
