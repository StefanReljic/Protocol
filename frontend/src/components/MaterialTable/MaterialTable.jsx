import React from 'react';
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_EN } from 'material-react-table/locales/en';
import EditRowButton from '../Buttons/EditRowButton';
import { Box, Button, Grid } from '@mui/material';

export function MaterialTable({ rowActions: RowActions, state, ...props }) {
  return (
    <MaterialReactTable
      enablePagination
      enableEditing
      enableFullScreenToggle={false}
      enableMultiRowSelection={false}
      enableDensityToggle={false}
      positionToolbarAlertBanner='none'
      density='spacious'
      renderTopToolbarCustomActions={() => {
        return (
          <Grid container direction='column' alignItems='flex-start'>
            <Grid item>
              <h4 className='w-3 text-dark'>{props.headerProps.title}</h4>
            </Grid>
            <Grid item>
              <Button onClick={props.headerProps.onAdd.onClick} variant='contained'>
                {props.headerProps.onAdd.label}
              </Button>
            </Grid>
          </Grid>
        );
      }}
      renderRowActionMenuItems={({ row, table }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <EditRowButton onClick={() => props.onEdit(row)} />
          {RowActions && <RowActions row={row}></RowActions>}
        </Box>
      )}
      localization={MRT_Localization_EN}
      state={{ ...state, density: 'compact' }}
      {...props}
    />
  );
}
