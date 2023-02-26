import { Grid } from '@mui/material';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { extractValidationErrors } from '../../../common/ErrorHandler/errorUtils';
import Input from '../../../components/Inputs/Input';
import { UserService } from '../../../services';

const User = forwardRef((props, ref) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordRepeat: '',
    isActive: 'YES',
  });
  const [errors, setErrors] = useState({
    username: null,
    password: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    passwordRepeat: null,
  });

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  const clearErrors = () => {
    setErrors({
      username: null,
      password: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      passwordRepeat: null,
    });
  };

  useImperativeHandle(ref, () => ({
    onAdd(onSuccess) {
      clearErrors();
      UserService.add(user, { onSuccess, onError });
    },
    onUpdate(onSuccess) {
      clearErrors();
      UserService.update(user, { onSuccess, onError });
    },
  }));

  const onUsernameBlur = () => {
    const username = user.username;
    if (username === undefined || username === '' || username.length < 6 || username.length > 14) {
      setErrors({ ...errors, username: 'Username must be between 6 and 14 characters long' });
    } else {
      setErrors({ ...errors, username: '' });
    }
  };

  const onUserChange = (event) => {
    const userCopy = { ...user };
    userCopy[event.target.id] = event.target.value;
    setUser(userCopy);
  };

  const onError = (error) => {
    const validationErrors = extractValidationErrors(error);
    setErrors({ ...errors, ...validationErrors });
  };

  return (
    <Grid container direction='column' spacing={1} style={{ paddingTop: '15px' }}>
      <Grid item>
        <Input
          id='username'
          error={errors.username}
          value={user.username}
          label='Username'
          onChange={onUserChange}
          onBlur={onUsernameBlur}
        />
      </Grid>
      <Grid item>
        <Input
          id='password'
          error={errors.password}
          value={user.password}
          label='Password'
          onChange={onUserChange}
          type='password'
        />
      </Grid>
      <Grid item>
        <Input
          id='passwordRepeat'
          error={errors.passwordRepeat}
          value={user.passwordRepeat}
          label='Repeat password'
          onChange={onUserChange}
          type='password'
        />
      </Grid>
      <Grid item>
        <Input
          id='firstName'
          error={errors.firstName}
          value={user.firstName}
          label='First name'
          onChange={onUserChange}
        />
      </Grid>
      <Grid item>
        <Input id='lastName' error={errors.lastName} value={user.lastName} label='Last name' onChange={onUserChange} />
      </Grid>
      <Grid item>
        <Input id='email' error={errors.email} value={user.email} label='E-mail' onChange={onUserChange} />
      </Grid>
    </Grid>
  );
});

export default User;
