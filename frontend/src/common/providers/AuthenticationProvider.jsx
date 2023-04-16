import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export const AuthenticationContext = React.createContext({
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

export default function AuthenticationProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.post('/api/authentication/validate-token').then((response) => {
      setIsLoggedIn(true);
    });
  }, []);

  const login = (credentials) => {
    axios.post('/api/authentication/create-token', credentials).then((response) => {
      localStorage.setItem('token', response.data);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
      setIsLoggedIn(true);
    });
  };

  const logout = () => {
    axios.post('/invalidate-token', localStorage.getItem('token')).then((response) => clearLoginContent());
  };

  function clearLoginContent() {
    axios.defaults.headers.common['Authorization'] = null;
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

  return (
    <AuthenticationContext.Provider value={{ login, logout, isLoggedIn }}>{children}</AuthenticationContext.Provider>
  );
}
