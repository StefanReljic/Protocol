import React from 'react';
import PersonIcon from '@mui/icons-material/Person';

export default function PageHeader() {
  return (
    <div className='page-header'>
      <div className='page-header-user'>
        <PersonIcon className='user-icon'></PersonIcon>
      </div>
    </div>
  );
}
