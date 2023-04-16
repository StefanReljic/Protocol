import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotificationProvider from './common/providers/NotificationProvider';
import Login from './views/Login';
import './assets/css/main.css';
import ProtectedRoutes from './routes/ProtectedRoutes';
import AuthenticationProvider from './common/providers/AuthenticationProvider';

export default function App() {
  return (
    <AuthenticationProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route path='login' element={<Login />} />
            <Route path='/*' element={<ProtectedRoutes />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthenticationProvider>
  );
}
