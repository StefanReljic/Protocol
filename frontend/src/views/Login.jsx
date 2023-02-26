import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import Input from '../components/Inputs/Input';

export default function Login(props) {
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
          <Button color='primary' variant='contained'>
            Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
