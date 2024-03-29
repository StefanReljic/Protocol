import React, { useContext } from 'react';
import Protocols from '../views/Protocols/Protocols';
import AdministrationRoutes from './AdministrationRoutes';
import { Navigate, Route, Routes } from 'react-router-dom';
import SideNavbar from '../components/Navbars/SideNavbar';
import { AuthenticationContext } from '../common/providers/AuthenticationProvider';

export default function ProtectedRoutes() {
  return (
    <>
      {localStorage.getItem('token') ? (
        <div className='application'>
          <SideNavbar />
          <div className='main'>
            <div className='main-content'>
              <Routes>
                <Route path='protocols' element={<Protocols />} />
                <Route path='administration/*' element={<AdministrationRoutes />} />
                <Route path='*' element={<Protocols />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to='login' />
      )}
    </>
  );
}
