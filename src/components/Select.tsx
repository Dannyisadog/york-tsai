"use client";

import {
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";

interface SelectItem {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
  items: SelectItem[];
}

export const Select = ({ label, value, onChange, items }: SelectProps) => {
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2" sx={{ color: "#999" }}>
        {label}
      </Typography>
      <MuiSelect
        value={value}
        onChange={onChange}
        sx={{
          color: "white",
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#333" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#666" },
        }}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </Stack>
  );
};
