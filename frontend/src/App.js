import React from 'react';
import { BrowserRouter, Route, Switch, Redirect, Routes } from 'react-router-dom';
import NotificationProvider from './common/providers/NotificationProvider';
import Companies from './views/Administration/Companies/Companies';
import OrganizationUnits from './views/Administration/OrganizationUnits/OrganizationUnits';
import Users from './views/Administration/Users/Users';
import ProtocolStatuses from './views/Administration/ProtocolStatuses/ProtocolStatuses';
import Protocols from './views/Protocols/Protocols';
import Login from './views/Login';
import SideNavbar from './components/Navbars/SideNavbar';
import PageHeader from './components/PageHeader/PageHeader';
import './assets/css/main.css';

export default function App() {
  return (
    <>
      <NotificationProvider>
        <BrowserRouter>
          <div className='application'>
            <SideNavbar />
            <div className='main'>
              <PageHeader />
              <div className='main-content'>
                <Routes>
                  <Route path='login' element={<Login />} />
                  <Route path='protocols' element={<Protocols />} />
                  <Route path='administration'>
                    <Route path='companies' element={<Companies />} />
                    <Route path='users' element={<Users />} />
                    <Route path='protocol-statuses' element={<ProtocolStatuses />} />
                    <Route path='organization-units' element={<OrganizationUnits />} />
                  </Route>
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </NotificationProvider>
    </>
  );
}
