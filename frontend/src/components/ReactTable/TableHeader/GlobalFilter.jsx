import React from 'react';
import { useAsyncDebounce } from 'react-table';
import Input from '../../Inputs/Input';

export default function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      <Input
        id='globalFilter'
        value={value || ''}
        label='Search'
        placeholder='Search'
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
}
