import React, { useContext } from 'react';
import Protocols from '../views/Protocols/Protocols';
import AdministrationRoutes from './AdministrationRoutes';
import { Navigate, Route, Routes } from 'react-router-dom';
import SideNavbar from '../components/Navbars/SideNavbar';
import { AuthenticationContext } from '../common/providers/AuthenticationProvider';

export default function ProtectedRoutes() {
  const { isLoggedIn } = useContext(AuthenticationContext);

  return (
    <>
      {isLoggedIn ? (
        <div className='application'>
          <SideNavbar />
          <div className='main'>
            <div className='main-content'>
              <Routes>
                <Route path='protocols' element={<Protocols />} />
                <Route path='administration/*' element={<AdministrationRoutes />} />
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
