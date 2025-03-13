import { Button as MuiButton } from "@mui/material";

interface OutlinedButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const OutlinedButton = (props: OutlinedButtonProps) => {
  const { children, onClick } = props;
  return (
    <MuiButton
      variant="outlined"
      onClick={onClick}
      sx={{
        color: 'white',
        borderColor: '#333',
        '&:hover': { borderColor: '#666', backgroundColor: 'rgba(255,255,255,0.1)' }
      }}
    >
      {children}
    </MuiButton>
  );
}