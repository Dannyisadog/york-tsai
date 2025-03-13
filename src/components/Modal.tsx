import { Box, IconButton, Modal as MuiModal, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}


export const Modal = (props: ModalProps) => {
  const { title, open, onClose, children } = props;
  return (
    <MuiModal
      open={open}
      aria-labelledby="create-video-modal"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 700,
          overflowY: 'scroll',
          bgcolor: 'black',
          border: '1px solid #333',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          color: 'white'
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton onClick={onClose} sx={{
            padding: 0,
          }}>
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>
        </Stack>
        {children}
      </Box>
    </MuiModal>
  );
}