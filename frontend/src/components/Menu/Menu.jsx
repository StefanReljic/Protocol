import React from 'react';

export default function Menu({}) {
  return (
    <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem onClick={handleClose}>Item 1</MenuItem>
      <MenuItem onClick={handleClose}>Item 2</MenuItem>
      <MenuItem onClick={handleClose}>Item 3</MenuItem>
    </Menu>
  );
}
