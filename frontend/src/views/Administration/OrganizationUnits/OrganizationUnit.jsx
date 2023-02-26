import { Grid } from '@mui/material';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { forwardRef } from 'react';
import { extractValidationErrors } from '../../../common/ErrorHandler/errorUtils';
import Input from '../../../components/Inputs/Input';
import { OrganizationUnitService } from '../../../services';

const OrganizationUnit = forwardRef((props, ref) => {
  const [organizationUnit, setOrganizationUnit] = useState({ id: null, name: '', code: '' });
  const [errors, setErrors] = useState({ name: null, code: null });

  useEffect(() => {
    setOrganizationUnit(props.organizationUnit);
  }, [props.organizationUnit]);

  useImperativeHandle(ref, () => ({
    onAdd(onSuccess) {
      setErrors({ name: null, code: null });
      OrganizationUnitService.add(organizationUnit, { onSuccess, onError });
    },
    onUpdate(onSuccess) {
      setErrors({ name: null, code: null });
      OrganizationUnitService.update(organizationUnit, { onSuccess, onError });
    },
  }));
  const onOrganizationUnitChange = (event) => {
    const organizationUnitCopy = { ...organizationUnit };
    organizationUnitCopy[event.target.id] = event.target.value;
    setOrganizationUnit(organizationUnitCopy);
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
          value={organizationUnit.name}
          label='Organization unit name'
          onChange={onOrganizationUnitChange}
        />
      </Grid>
      <Grid item>
        <Input
          id='code'
          error={errors.code}
          value={organizationUnit.code}
          label='Organization unit code'
          onChange={onOrganizationUnitChange}
        />
      </Grid>
    </Grid>
  );
});

export default OrganizationUnit;
