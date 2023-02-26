import React from 'react';
import { FormControl, TextField as MaterialInput, FormHelperText } from '@mui/material';

export default function DatePicker(props) {
  return (
    <FormControl classnames='w-100'>
      <MaterialInput {...props} size='small' invalid={Boolean(props.error)} className='text-dark' fullWidth />
      <FormHelperText>{props.error}</FormHelperText>
    </FormControl>
  );
}
