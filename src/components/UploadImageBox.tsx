import { Box, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { uploadImage } from "@/api/image";
import { useState } from "react";
interface UploadImageBoxProps {
  title: string;
  onRemove?: () => void;
  imageUrl?: string;
  onUploaded: (imageUrl: string) => void;
  error?: string;
}

export const UploadImageBox = (props: UploadImageBoxProps) => {
  const { title, onRemove, imageUrl, onUploaded, error } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const uploadImageResp = await uploadImage(file);
      setCurrentImageUrl(uploadImageResp.downloadUrl);
      setIsLoading(false);
      onUploaded(uploadImageResp.downloadUrl);
    }
  };

  return (
    <Stack spacing={1}>
      <Box
        component="label"
        sx={{
          aspectRatio: '16/9',
          width: '100%',
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
          onChange={(e) => {
            handleImageUpload(e);
          }}
          style={{ display: 'none' }}
        />
        {imageUrl ? (
          <Box
            component="img"
            src={currentImageUrl || imageUrl}
            alt="Thumbnail preview"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 1,
            }}
          />
        ) : (
          isLoading ? (
            <CircularProgress sx={{ color: 'white' }} />
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <AddIcon sx={{ fontSize: 40, color: 'white', mb: 1 }} />
              <Typography color="white">
                {title}
              </Typography>
            </Box>
          )
        )}
        {onRemove && (
          <Box sx={{
            position: 'absolute',
            top: -10,
            right: -10,
            backgroundColor: 'white',
            borderRadius: '50%',
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <IconButton onClick={onRemove}>
              <ClearIcon sx={{ color: 'black', fontSize: 16 }} />
            </IconButton>
          </Box>
        )}
      </Box>
      {error && <Typography variant="caption" sx={{ color: 'red' }}>{error}</Typography>}
    </Stack>
  );
};