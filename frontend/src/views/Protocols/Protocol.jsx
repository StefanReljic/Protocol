import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Grid } from '@mui/material';
import Input from '../../components/Inputs/Input';
import { extractValidationErrors } from '../../common/ErrorHandler/errorUtils';
import { ProtocolService, CompanyService } from '../../services';
import Select from '../../components/Inputs/Select';
import { forwardRef } from 'react';
import DatePicker from '../../components/Inputs/DatePicker';

const Protocol = forwardRef((props, ref) => {
  const [protocol, setProtocol] = useState({
    id: null,
    protocolNumber: '',
    numberOfSubprotocols: 0,
    senderId: '',
    sender: '',
    subject: '',
    submissionDate: '',
    year: 2022,
  });
  const [errors, setErrors] = useState({
    id: null,
    protocolNumber: null,
    numberOfSubprotocols: 0,
    sender: null,
    subject: null,
    submissionDate: null,
    year: null,
  });
  const [companies, setCompanies] = useState([]);

  useImperativeHandle(ref, () => ({
    onAdd(onSuccess) {
      clearErrors();
      ProtocolService.add(protocol, { onSuccess, onError });
    },
    onUpdate(onSuccess) {
      clearErrors();
      ProtocolService.update(protocol, { onSuccess, onError });
    },
  }));

  useEffect(() => {
    (async () => {
      setCompanies(await CompanyService.getIdLabelObjects());
    })();
  }, []);

  useEffect(() => {
    setProtocol(props.protocol);
  }, [props.protocol]);

  const onProtocolChange = (event) => {
    const protocolCopy = { ...protocol };
    const { id, value, name } = event.target;
    const selector = id ? id : name;
    protocolCopy[selector] = value;
    setProtocol(protocolCopy);
  };

  const onError = (error) => {
    const validationErrors = extractValidationErrors(error);
    setErrors({ ...errors, ...validationErrors });
  };

  const clearErrors = () => {
    setErrors({
      id: null,
      protocolNumber: null,
      numberOfSubprotocols: 0,
      sender: null,
      subject: null,
      submissionDate: null,
      year: null,
    });
  };

  return (
    <Grid container direction='column' spacing={1} style={{ paddingTop: '15px' }}>
      <Grid item xs={12}>
        <Input
          id='protocolNumber'
          error={errors.protocolNumber}
          value={protocol.protocolNumber}
          required
          label='Protocol number'
          onChange={onProtocolChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          id='subject'
          error={errors.subject}
          value={protocol.subject}
          required
          label='Subject'
          onChange={onProtocolChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Select
          id='senderId'
          required
          items={companies}
          error={errors.sender}
          value={protocol.senderId}
          label='Sender'
          onChange={onProtocolChange}
          valueKey='id'
          labelKey='label'
        />
      </Grid>
      <Grid item xs={12}>
        <DatePicker
          id='submissionDate'
          error={errors.submissionDate}
          value={protocol.submissionDate}
          type='date'
          required
          label='Submission date'
          onChange={onProtocolChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          id='year'
          type='number'
          error={errors.year}
          value={protocol.year}
          label='Year'
          onChange={onProtocolChange}
        />
      </Grid>
    </Grid>
  );
});

export default Protocol;
