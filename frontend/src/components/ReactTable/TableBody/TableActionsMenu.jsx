import React from 'react';
import { MenuItem, Menu } from '@mui/material';
import { Archive } from '@mui/icons-material';

export default function TableActionsMenu({ anchorEl, onClose, row, actions }) {
  return (
    <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={onClose}>
      {Boolean(actions) &&
        actions.map(({ component, onClick }) => {
          return (
            <MenuItem
              onClick={() => {
                onClick(row);
                onClose();
              }}
            >
              {component}
            </MenuItem>
          );
        })}
    </Menu>
  );
}
