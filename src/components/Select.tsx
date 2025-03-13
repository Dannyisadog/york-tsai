"use client"

import { Select as MuiSelect, MenuItem, SelectChangeEvent, Stack, Typography } from '@mui/material';

interface SelectProps {
  label?: string;
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
  items: string[];
}

export const Select = ({ label, value, onChange, items }: SelectProps) => {
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2" sx={{ color: '#999' }}>{label}</Typography>
      <MuiSelect
        value={value}
        onChange={onChange}
        sx={{
          color: 'white',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
        }}
      >
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </MuiSelect>
    </Stack>
  );
}