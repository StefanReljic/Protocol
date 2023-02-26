import React from 'react';
import { Button } from 'reactstrap';

export default function UpdateButton(props) {
  return (
    <Button color='primary' variant='contained' className='pull-right' onClick={props.onClick}>
      {props.label}
    </Button>
  );
}
