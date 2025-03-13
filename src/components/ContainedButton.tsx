import { Button as MuiButton } from "@mui/material";

interface ContainedButtonProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ContainedButton = (props: ContainedButtonProps) => {
  const { children, onClick } = props;
  return (
    <MuiButton
      variant="contained"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        '&:hover': { backgroundColor: '#e0e0e0' }
      }}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
}
