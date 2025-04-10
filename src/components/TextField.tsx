"use client";

import { TextField as MuiTextField, Stack, Typography } from "@mui/material";
interface TextFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

export const TextField = ({
  label,
  value,
  onChange,
  error,
}: TextFieldProps) => {
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2" sx={{ color: "#999" }}>
        {label}
      </Typography>
      <MuiTextField
        fullWidth
        value={value}
        onChange={onChange}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": { borderColor: "#333" },
            "&:hover fieldset": { borderColor: "#666" },
          },
          "& .MuiInputLabel-root": { color: "#999" },
        }}
      />
      {error && (
        <Typography variant="caption" sx={{ color: "red" }}>
          {error}
        </Typography>
      )}
    </Stack>
  );
};
