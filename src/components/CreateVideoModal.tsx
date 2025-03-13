"use client";

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  Stack,
  IconButton
} from '@mui/material';

import { VideoType } from '@prisma/client';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from './TextField';
import { Select } from './Select';
import { Modal } from './Modal';
import { OutlinedButton } from './OutlinedButton';
import { ContainedButton } from './ContainedButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface CreateVideoModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateVideoModal = ({ open, onClose }: CreateVideoModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtube_link: '',
    video_type: 'Commercial',
    thumbnail: null as File | null,
    related_images: [] as File[]
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'related') => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === 'thumbnail') {
        setFormData({ ...formData, thumbnail: file });
      } else {
        setFormData({ ...formData, related_images: [...formData.related_images, file] });
      }
    }
  };

  const handleRemoveRelatedImage = (index: number) => {
    setFormData({
      ...formData,
      related_images: formData.related_images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    onClose();
  };

  useEffect(() => {
    setFormData({
      title: '',
      description: '',
      youtube_link: '',
      video_type: 'Commercial',
      thumbnail: null,
      related_images: []
    });
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
          />

          <TextField
            label="敘述"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <Box>
            <Typography variant="subtitle2" sx={{ color: '#999', mb: 1 }}>封面縮圖</Typography>
            <Box
              component="label"
              sx={{
                width: '100%',
                height: 200,
                border: '2px dashed #fff',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
                position: 'relative',
                '&:hover': {
                  borderColor: '#666',
                },
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'thumbnail')}
                style={{ display: 'none' }}
              />
              {formData.thumbnail ? (
                <Box
                  component="img"
                  src={URL.createObjectURL(formData.thumbnail)}
                  alt="Thumbnail preview"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />
              ) : (
                <Box sx={{ textAlign: 'center' }}>
                  <AddIcon sx={{ fontSize: 40, color: 'white', mb: 1 }} />
                  <Typography color="white">
                    上傳封面縮圖
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          <TextField
            label="YouTube 連結"
            value={formData.youtube_link}
            onChange={(e) => setFormData({ ...formData, youtube_link: e.target.value })}
          />

          <FormControl fullWidth>
            <Select label="影片類型" value={formData.video_type} onChange={(e) => setFormData({ ...formData, video_type: e.target.value as VideoType })} items={Object.values(VideoType)} />
          </FormControl>

          <Box>
            <Typography variant="subtitle2" sx={{ color: '#999', mb: 1 }}>相關圖片</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
              {formData.related_images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 150,
                    border: '2px solid #333',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    component="img"
                    src={URL.createObjectURL(image)}
                    alt={`Related image ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <IconButton
                    onClick={() => handleRemoveRelatedImage(index)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.7)',
                      },
                    }}
                  >
                    <DeleteIcon sx={{ color: 'white' }} />
                  </IconButton>
                </Box>
              ))}
              <Box
                component="label"
                sx={{
                  width: '100%',
                  height: 150,
                  border: '2px dashed #fff',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  '&:hover': {
                    borderColor: '#666',
                  },
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'related')}
                  style={{ display: 'none' }}
                />
                <Box sx={{ textAlign: 'center' }}>
                  <AddIcon sx={{ fontSize: 40, color: 'white', mb: 1 }} />
                  <Typography color="white">
                    上傳相關圖片
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <OutlinedButton onClick={onClose}>取消</OutlinedButton>
            <ContainedButton onClick={handleSubmit}>新增影片</ContainedButton>
          </Box>
        </Stack>
      </form>
    </Modal>
  );
};