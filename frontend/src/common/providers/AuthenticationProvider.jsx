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
  console.log('AuthenticationProvider');
  /*useEffect(() => {
    axios
      .post('/api/authentication/validate-token')
      .then((response) => {
        setIsLoggedIn(true);
        navigate(window.location.pathname);
      })
      .catch(() => clearLoginContent());
  }, []);*/

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
  }

  return (
    <AuthenticationContext.Provider value={{ login, logout, isLoggedIn: () => isLoggedIn }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
