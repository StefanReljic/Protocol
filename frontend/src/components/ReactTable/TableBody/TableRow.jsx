import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { ReactTable } from '../ReactTable';

export default function TableRow({ row, visibleColumns, renderRowSubComponent }) {
  const rowProps = row.getRowProps();

  return (
    <>
      <tr {...row.getRowProps()}>
        {row.cells.map((cell, i) => {
          return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
        })}
      </tr>
      {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns })}
    </>
  );
}
