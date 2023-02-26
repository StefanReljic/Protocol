import { FormControl, InputLabel, OutlinedInput as MaterialInput, FormHelperText } from '@mui/material';
import React from 'react';

export default function Input({ error, ...props }) {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={props.id} size='small'>
        {props.label}
        {props.required && <span color='red'>*</span>}
      </InputLabel>
      <MaterialInput size='small' error={Boolean(error)} {...props} />
      <FormHelperText className='input-error-text'>{error}</FormHelperText>
    </FormControl>
  );
}
