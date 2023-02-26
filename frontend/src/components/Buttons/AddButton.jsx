import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';

export default function AddButton({ onClick, tooltip }) {
  return (
    <Tooltip arrow title={tooltip || 'Add'}>
      <IconButton onClick={onClick} color='primary'>
        <Add />
      </IconButton>
    </Tooltip>
  );
}
