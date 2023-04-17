import React, { useState } from 'react';
import Input from '../components/Inputs/Input';
import { useContext } from 'react';
import { AuthenticationContext } from '../common/providers/AuthenticationProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';

export default function Login(props) {
  const { login } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: null,
    password: null,
  });

  const onLoginChange = (event) => {
    const credentialsCopy = { ...credentials };
    credentialsCopy[event.target.id] = event.target.value;
    setCredentials(credentialsCopy);
  };

  if (localStorage.getItem('token') && window.location.pathname === '/login') {
    return <Navigate to='/protocols' />;
  }

  return (
    <Grid container direction='column'>
      <Grid item>
        <h1>Login</h1>
      </Grid>
      <Grid item>
        <Input
          id='username'
          error={errors.username}
          value={credentials.username}
          required
          label='Username'
          onChange={onLoginChange}
        />
      </Grid>
      <Grid item>
        <Input
          id='password'
          error={errors.password}
          value={credentials.password}
          required
          type='password'
          label='Password'
          onChange={onLoginChange}
        />
      </Grid>
      <Grid item>
        <Button color='primary' variant='contained' onClick={() => login(credentials)}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
}
