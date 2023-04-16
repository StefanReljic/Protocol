import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const login = (username, password) => {
    // make API call to authenticate user
    // if successful, set user state and navigate to the protected route
    setUser({ username });
    navigate('/protocols');
  };

  const logout = () => {
    // make API call to log out user
    // if successful, clear user state and navigate to the login route
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    // check if user is authenticated on initial render
    // if not, navigate to the login route
    /*if (user && location.pathname === '/login') {
      navigate('/protocols');
    }*/
    if (!user && location.pathname !== '/login') {
      navigate('/login');
    }
    navigate('/protocols');
  }, [user]);

  return { user, login, logout };
};
