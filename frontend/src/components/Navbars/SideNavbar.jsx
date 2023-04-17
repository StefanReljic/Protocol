import { Menu as MenuIcon } from '@mui/icons-material';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthenticationContext } from '../../common/providers/AuthenticationProvider';

function SideNavItem({ to, label, onClick }) {
  const [activeClass, setActiveClass] = useState('');
  const location = useLocation();

  useEffect(() => {
    setActiveClass(to === location.pathname ? 'side-nav-item-active' : '');
  }, [location]);

  return (
    <NavLink to={to}>
      <div className={`side-nav-item ${activeClass}`} onClick={onClick}>
        {label}
      </div>
    </NavLink>
  );
}

export default function SideNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useContext(AuthenticationContext);

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
              <SideNavItem to='/login' label='Logout' onClick={logout} />
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
        <SideNavItem to='/login' label='Logout' onClick={logout} />
      </div>
    </>
  );
}
