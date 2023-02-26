import { Button, Grid, Typography } from '@mui/material';
import React, { forwardRef, useEffect, useState } from 'react';
import { useImperativeHandle } from 'react';
import Select from '../../components/Inputs/Select';
import { ProtocolService } from '../../services';
import Subprotocol from './Subprotocol';

const Subprotocols = forwardRef((props, ref) => {
  const [availableSubprotocols, setAvailableSubprotocols] = useState([]);
  const [addedSubprotocols, setAddedSubprotocols] = useState([]);
  const [selectedSubprotocolId, setSelectedSubprotocolId] = useState('');
  const [existingSubprotocols, setExistingSubprotocols] = useState([]);

  useEffect(() => {
    (async () => {
      setAvailableSubprotocols(await ProtocolService.getAllProtocolsWithoutParent(props.protocol.id));
      setExistingSubprotocols(await ProtocolService.getAllSubprotocols(props.protocol.id));
    })();
  }, []);

  useImperativeHandle(ref, () => ({
    onSave(onSaveSuccess) {
      const addedSubprotocolIds = addedSubprotocols.map((subprotocol) => subprotocol.id);
      ProtocolService.addSubprotocols(props.protocol.id, addedSubprotocolIds);
      if (onSaveSuccess) onSaveSuccess();
    },
  }));

  const onSubprotocolChange = (event) => {
    setSelectedSubprotocolId(event.target.value);
  };

  const onSubprotocolAdd = () => {
    let currentlyAvailableSubprotocols = [...availableSubprotocols];
    const currentlyAddedSubprotocols = [...addedSubprotocols];
    const selectedSubprotocol = currentlyAvailableSubprotocols.find(
      (subprotocol) => subprotocol.id == selectedSubprotocolId
    );
    currentlyAddedSubprotocols.push(selectedSubprotocol);
    currentlyAvailableSubprotocols = currentlyAvailableSubprotocols.filter(
      (subprotocol) => subprotocol.id != selectedSubprotocolId
    );
    setAddedSubprotocols(currentlyAddedSubprotocols);
    setAvailableSubprotocols(currentlyAvailableSubprotocols);
    setSelectedSubprotocolId('');
  };

  return (
    <Grid container direction='column'>
      <Grid item>
        {availableSubprotocols.length !== 0 ? (
          <Grid container direction='row' spacing={3}>
            <Grid item xs={5}>
              <Select
                id='subprotocol'
                items={availableSubprotocols}
                value={selectedSubprotocolId}
                required
                label='Select subprotocol'
                onChange={onSubprotocolChange}
                valueKey='id'
                labelKey='protocolNumber'
                labelFunction={({ sender, protocolNumber }) => `${sender}-${protocolNumber}`}
              />
            </Grid>
            <Grid item>
              <Button variant='contained' onClick={onSubprotocolAdd}>
                Add
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Typography style={{ color: 'red' }}>No subprotocols available for adding</Typography>
        )}
      </Grid>
      <Grid item>
        <Typography>Subprotocols for protocol {props.protocol.protocolNumber}:</Typography>
      </Grid>
      <Grid item>
        <Grid container direction='column'>
          {addedSubprotocols.map((subprotocol) => (
            <Grid item key={subprotocol.id}>
              <Subprotocol subprotocol={subprotocol} backgroundColor='#9f9' />
              <hr style={{ width: '100%', marginTop: '0.5rem' }}></hr>
            </Grid>
          ))}
          {existingSubprotocols.map((subprotocol) => (
            <Grid item key={subprotocol.id}>
              <Subprotocol subprotocol={subprotocol} />
              <hr style={{ width: '100%', marginTop: '0.5rem' }}></hr>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
});

export default Subprotocols;
