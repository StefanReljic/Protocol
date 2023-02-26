import { Grid } from '@mui/material';
import React, { useImperativeHandle, useState } from 'react';
import { useEffect } from 'react';
import { forwardRef } from 'react';
import { extractValidationErrors } from '../../../common/ErrorHandler/errorUtils';
import Input from '../../../components/Inputs/Input';
import { CompanyService } from '../../../services';

const Company = forwardRef((props, ref) => {
  const [company, setCompany] = useState({ id: null, name: '', code: '' });
  const [errors, setErrors] = useState({ name: null, code: null });

  useEffect(() => {
    setCompany(props.company);
  }, [props.company]);

  useImperativeHandle(ref, () => ({
    onAdd(onSuccess) {
      setErrors({ name: null, code: null });
      CompanyService.add(company, { onSuccess, onError });
    },
    onUpdate(onSuccess) {
      setErrors({ name: null, code: null });
      CompanyService.update(company, { onSuccess, onError });
    },
  }));

  const onCompanyChange = (event) => {
    const companyCopy = { ...company };
    companyCopy[event.target.id] = event.target.value;
    setCompany(companyCopy);
  };

  const onError = (error) => {
    const validationErrors = extractValidationErrors(error);
    setErrors({ ...errors, ...validationErrors });
  };

  return (
    <Grid container direction='column' spacing={1} style={{ paddingTop: '15px' }}>
      <Grid item>
        <Input id='name' error={errors.name} value={company.name} label='Company name' onChange={onCompanyChange} />
      </Grid>
      <Grid item>
        <Input id='code' error={errors.code} value={company.code} label='Company code' onChange={onCompanyChange} />
      </Grid>
    </Grid>
  );
});

export default Company;
