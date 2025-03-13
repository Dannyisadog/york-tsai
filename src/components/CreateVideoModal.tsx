"use client";

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  Stack,
} from '@mui/material';

import { VideoType } from '@prisma/client';
import { TextField } from './TextField';
import { Select } from './Select';
import { Modal } from './Modal';
import { OutlinedButton } from './OutlinedButton';
import { ContainedButton } from './ContainedButton';
import { UploadImageBox } from './UploadImageBox';
import { createVideo } from '@/api/video';

interface CreateVideoModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateVideoModal = ({ open, onClose }: CreateVideoModalProps) => {
  const [titleError, setTitleError] = useState<string | undefined>(undefined);
  const [coverImageError, setCoverImageError] = useState<string | undefined>(undefined);
  const [youtubeLinkError, setYoutubeLinkError] = useState<string | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtube_link: '',
    video_type: 'Commercial' as VideoType,
    thumbnail: "",
    related_images: [] as string[]
  });

  const handleRemoveRelatedImage = (index: number) => {
    setFormData({
      ...formData,
      related_images: formData.related_images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setTitleError(formData.title ? undefined : '標題不能為空');
    setCoverImageError(formData.thumbnail ? undefined : '封面縮圖不能為空');
    setYoutubeLinkError(formData.youtube_link ? undefined : 'YouTube 連結不能為空');

    if (!formData.title || !formData.thumbnail || !formData.youtube_link) {
      return;
    }

    e.preventDefault();
    setIsLoading(true);
    await createVideo({
      title: formData.title,
      description: formData.description,
      youtubeLink: formData.youtube_link,
      coverImage: formData.thumbnail,
      videoType: formData.video_type,
      relatedImages: formData.related_images
    });
    onClose();
    setIsLoading(false);
    window.location.reload();
  };

  useEffect(() => {
    setFormData({
      title: '',
      description: '',
      youtube_link: '',
      video_type: 'Commercial',
      thumbnail: "",
      related_images: []
    });
    setTitleError(undefined);
    setCoverImageError(undefined);
    setYoutubeLinkError(undefined);
  }, [open]);

  return (
    <Modal
      title="新增影片"
      open={open}
      onClose={onClose}
      aria-labelledby="create-video-modal"
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="標題"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={titleError}
          />

          <TextField
            label="敘述"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <Box>
            <Typography variant="subtitle2" sx={{ color: '#999', mb: 1 }}>封面縮圖</Typography>
            <UploadImageBox
              title="封面縮圖"
              imageUrl={formData.thumbnail}
              onUploaded={(imageUrl) => {
                setFormData({ ...formData, thumbnail: imageUrl });
              }}
              error={coverImageError}
            />
          </Box>

          <TextField
            label="YouTube 連結"
            value={formData.youtube_link}
            onChange={(e) => setFormData({ ...formData, youtube_link: e.target.value })}
            error={youtubeLinkError}
          />

          <FormControl fullWidth>
            <Select label="影片類型" value={formData.video_type} onChange={(e) => setFormData({ ...formData, video_type: e.target.value as VideoType })} items={Object.values(VideoType)} />
          </FormControl>

          <Box>
            <Typography variant="subtitle2" sx={{ color: '#999', mb: 1 }}>相關圖片</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
              {formData.related_images.map((image, index) => (
                <UploadImageBox
                  key={index}
                  title="相關圖片"
                  imageUrl={image}
                  onRemove={() => handleRemoveRelatedImage(index)}
                  onUploaded={(imageUrl) => {
                    setFormData({ ...formData, related_images: [...formData.related_images, imageUrl] });
                  }}
                />
              ))}
              <UploadImageBox
                title="相關圖片"
                onUploaded={(imageUrl) => {
                  setFormData({ ...formData, related_images: [...formData.related_images, imageUrl] });
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <OutlinedButton onClick={onClose}>取消</OutlinedButton>
            <ContainedButton onClick={handleSubmit} disabled={isLoading} isLoading={isLoading}>新增影片</ContainedButton>
          </Box>
        </Stack>
      </form>
    </Modal>
  );
};