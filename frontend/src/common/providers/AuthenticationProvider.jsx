import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthenticationContext = React.createContext({
  login: () => {},
  logout: () => {},
  isLoggedIn: () => {},
});

export default function AuthenticationProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = (credentials) => {
    axios
      .post('/api/authentication/create-token', credentials)
      .then((response) => {
        localStorage.setItem('token', response.data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        setIsLoggedIn(true);
        navigate('/protocols');
      })
      .catch(() => clearLoginContent());
  };

  const logout = () => {
    axios
      .post('/invalidate-token', localStorage.getItem('token'))
      .then((response) => clearLoginContent())
      .catch(() => clearLoginContent());
  };

  function clearLoginContent() {
    axios.defaults.headers.common['Authorization'] = null;
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  }

  return (
    <AuthenticationContext.Provider value={{ login, logout, isLoggedIn: () => isLoggedIn }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
