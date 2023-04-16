import { Menu as MenuIcon } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function SideNavItem({ to, label }) {
  const [activeClass, setActiveClass] = useState('');
  const location = useLocation();

  useEffect(() => {
    setActiveClass(to === location.pathname ? 'side-nav-item-active' : '');
  }, [location]);

  return (
    <NavLink to={to}>
      <div className={`side-nav-item ${activeClass}`}>{label}</div>
    </NavLink>
  );
}

export default function SideNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <div className='small-screen-nav'>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MenuIcon className='menu-icon-color' />
        </IconButton>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem>
            <div>
              <SideNavItem to='/protocols' label='Protocols' />
              <SideNavItem to='/administration/companies' label='Companies' />
              <SideNavItem to='/administration/organization-units' label='Organization units' />
              <SideNavItem to='/administration/protocol-statuses' label='Protocol statuses' />
              <SideNavItem to='/administration/users' label='Users' />
            </div>
          </MenuItem>
        </Menu>
      </div>

      <div className='side-nav'>
        <SideNavItem to='/protocols' label='Protocols' />
        <SideNavItem to='/administration/companies' label='Companies' />
        <SideNavItem to='/administration/organization-units' label='Organization units' />
        <SideNavItem to='/administration/protocol-statuses' label='Protocol statuses' />
        <SideNavItem to='/administration/users' label='Users' />
      </div>
    </>
  );
}
