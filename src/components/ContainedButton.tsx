import { CircularProgress, Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";

interface ContainedButtonProps extends MuiButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const ContainedButton = (props: ContainedButtonProps) => {
  const { children, isLoading, ...rest } = props;
  return (
    <MuiButton
      variant="contained"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        '&:hover': { backgroundColor: '#e0e0e0' }
      }}
      {...rest}
    >
      {isLoading ? <CircularProgress size={20} sx={{ color: 'black' }} /> : children}
    </MuiButton>
  );
}
