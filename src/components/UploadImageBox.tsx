import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import imageCompression, { Options } from "browser-image-compression";
import { uploadImage } from "@/api/image";
import { useState } from "react";

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1024,
  useWebWorker: true,
  initialQuality: 0.8,
} satisfies Options;

interface UploadImageBoxProps {
  title: string;
  onRemove?: () => void;
  imageUrl?: string;
  onUploaded: (imageUrl: string) => void;
  error?: string;
  par: string;
  bucketUrl: string;
  fixedHeight?: boolean;
}

export const UploadImageBox = (props: UploadImageBoxProps) => {
  const {
    title,
    onRemove,
    imageUrl,
    onUploaded,
    error,
    par,
    bucketUrl,
    fixedHeight,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const compressedFile = await imageCompression(file, options);
      setIsLoading(true);
      const uploadImageResp = await uploadImage(par, compressedFile);
      setCurrentImageUrl(`${bucketUrl}/${uploadImageResp}`);
      setIsLoading(false);
      onUploaded(`${bucketUrl}/${uploadImageResp}`);
    }
  };

  return (
    <Stack spacing={1}>
      <Box position="relative">
        <Box
          component="label"
          sx={{
            aspectRatio: "16/9",
            width: "100%",
            ...(fixedHeight && {
              height: "100%",
              minHeight: "200px",
            }),
            border: "2px dashed #fff",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "border-color 0.2s",
            position: "relative",
            "&:hover": {
              borderColor: "#666",
            },
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleImageUpload(e);
            }}
            style={{ display: "none" }}
          />
          {imageUrl ? (
            <Box
              component="img"
              src={currentImageUrl || imageUrl}
              alt="Thumbnail preview"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 1,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          ) : isLoading ? (
            <CircularProgress sx={{ color: "white" }} />
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <AddIcon sx={{ fontSize: 40, color: "white", mb: 1 }} />
              <Typography color="white">{title}</Typography>
            </Box>
          )}
        </Box>

        {onRemove && (
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "white",
              width: 20,
              height: 20,
              boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
              zIndex: 9999,
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onRemove();
              return false;
            }}
          >
            <ClearIcon sx={{ color: "black", fontSize: 20 }} />
          </IconButton>
        )}
      </Box>

      {error && (
        <Typography variant="caption" sx={{ color: "red" }}>
          {error}
        </Typography>
      )}
    </Stack>
  );
};
