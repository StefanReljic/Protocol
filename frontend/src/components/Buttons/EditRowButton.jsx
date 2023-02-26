import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Edit } from '@mui/icons-material';

export default function EditRowButton({ onClick }) {
  return (
    <Tooltip arrow title='Edit'>
      <IconButton onClick={onClick}>
        <Edit />
      </IconButton>
    </Tooltip>
  );
}
