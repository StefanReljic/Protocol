import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MaterialSelect } from '@mui/material';
import React from 'react';
import Input from './Input';

export default function Select(props) {
  const { id, error, value, label, onChange, valueKey, labelKey, items, labelFunction, required } = props;

  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}_select_label`} size='small'>
        {label}
        {required && <span color='red'>*</span>}
      </InputLabel>
      <MaterialSelect
        size='small'
        id={id}
        name={id}
        value={value}
        labelId={`${id}_select_label`}
        label={label}
        onChange={onChange}
      >
        {items.map((item) => (
          <MenuItem key={item[valueKey]} value={item[valueKey]} className='text-dark'>
            {labelFunction ? labelFunction(item) : item[labelKey]}
          </MenuItem>
        ))}
      </MaterialSelect>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
}
