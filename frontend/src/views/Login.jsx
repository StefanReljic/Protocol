import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import Input from '../components/Inputs/Input';
import axios from 'axios';
import { useAuth } from '../common/hooks/useAuth';
import { useContext } from 'react';
import { AuthenticationContext } from '../common/providers/AuthenticationProvider';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Login(props) {
  const { login, isLoggedIn } = useContext(AuthenticationContext);
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

  function authenticate() {
    login(credentials);
    navigate('/protocols');
    /*axios.post('/api/login', credentials).then((response) => {
      localStorage.setItem('token', response.data.token);
      window.location.href = '/dashboard'; // Redirect to dashboard after successful login
    });*/
  }

  if (isLoggedIn) {
    return <Navigate to='/protocols' />;
  }

  return (
    <Container className='w-25 p-5'>
      <Row>
        <h1>Login</h1>
      </Row>
      <Row>
        <Col>
          <Input
            id='username'
            error={errors.username}
            value={credentials.username}
            required
            label='Username'
            onChange={onLoginChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            id='password'
            error={errors.password}
            value={credentials.password}
            required
            type='password'
            label='Password'
            onChange={onLoginChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button color='primary' variant='contained' onClick={authenticate}>
            Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
