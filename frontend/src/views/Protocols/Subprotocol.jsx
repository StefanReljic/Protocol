import { Grid, Typography } from '@mui/material';
import React from 'react';

export default function Subprotocol({ subprotocol, backgroundColor }) {
  const style = {
    container: {
      backgroundColor,
      border: 'solid',
      borderWidth: '1px',
      borderColor: 'grey',
      borderRadius: '5px',
      padding: '5px',
    },
    typography: {
      color: 'gray',
      fontSize: '12px',
    },
  };

  return (
    <Grid container direction='row' justifyContent='space-between' style={style.container}>
      <Grid item>
        <Typography style={style.typography}>{`Protocol number: ${subprotocol.protocolNumber}`}</Typography>
        <Typography style={style.typography}>{`Subject: ${subprotocol.subject}`}</Typography>
        <Typography style={style.typography}>{`Sender: ${subprotocol.sender}`}</Typography>
      </Grid>
      <Grid item>
        <Typography style={style.typography}>{`Submission date: ${subprotocol.submissionDate}`}</Typography>
        <Typography style={style.typography}>{`Status: Archived`}</Typography>
      </Grid>
    </Grid>
  );
}
