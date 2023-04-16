import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Companies from '../views/Administration/Companies/Companies';
import Users from '../views/Administration/Users/Users';
import ProtocolStatuses from '../views/Administration/ProtocolStatuses/ProtocolStatuses';
import OrganizationUnits from '../views/Administration/OrganizationUnits/OrganizationUnits';

export default function AdministrationRoutes() {
  return (
    <Routes>
      <Route path='companies' element={<Companies />} />
      <Route path='users' element={<Users />} />
      <Route path='protocol-statuses' element={<ProtocolStatuses />} />
      <Route path='organization-units' element={<OrganizationUnits />} />
    </Routes>
  );
}
