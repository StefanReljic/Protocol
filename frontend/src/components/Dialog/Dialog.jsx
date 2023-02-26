import React from 'react';
import { Button, Dialog as MaterialDialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function Dialog({ open, title, children, onClose, onSave }) {
  return (
    <MaterialDialog open={open} fullWidth maxWidth='sm'>
      <DialogTitle textAlign='center' color='black'>
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onSave} variant='contained'>
          Save
        </Button>
        <Button onClick={onClose} variant='outlined'>
          Cancel
        </Button>
      </DialogActions>
    </MaterialDialog>
  );
}
