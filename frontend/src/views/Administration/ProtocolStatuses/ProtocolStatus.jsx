import { Grid } from '@mui/material';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { forwardRef } from 'react';
import { extractValidationErrors } from '../../../common/ErrorHandler/errorUtils';
import Input from '../../../components/Inputs/Input';
import { ProtocolStatusService } from '../../../services';

const ProtocolStatus = forwardRef((props, ref) => {
  const [protocolStatus, setProtocolStatus] = useState({ id: null, name: '', code: '' });
  const [errors, setErrors] = useState({ name: null, code: null });

  useEffect(() => {
    setProtocolStatus(props.protocolStatus);
  }, [props.protocolStatus]);

  useImperativeHandle(ref, () => ({
    onAdd(onSuccess) {
      setErrors({ name: null, code: null });
      ProtocolStatusService.add(protocolStatus, { onSuccess, onError });
    },
    onUpdate(onSuccess) {
      setErrors({ name: null, code: null });
      ProtocolStatusService.update(protocolStatus, { onSuccess, onError });
    },
  }));

  const onProtocolStatusChange = (event) => {
    const protocolStatusCopy = { ...protocolStatus };
    protocolStatusCopy[event.target.id] = event.target.value;
    setProtocolStatus(protocolStatusCopy);
  };

  const onError = (error) => {
    const validationErrors = extractValidationErrors(error);
    setErrors({ ...errors, ...validationErrors });
  };

  return (
    <Grid container direction='column' spacing={1} style={{ paddingTop: '15px' }}>
      <Grid item>
        <Input
          id='name'
          error={errors.name}
          value={protocolStatus.name}
          label='Protocol status name'
          onChange={onProtocolStatusChange}
        />
      </Grid>
      <Grid item>
        <Input
          id='code'
          error={errors.code}
          value={protocolStatus.code}
          label='Protocol status code'
          onChange={onProtocolStatusChange}
        />
      </Grid>
    </Grid>
  );
});

export default ProtocolStatus;
