import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { ReactTable } from '../ReactTable';

export default function TableRow({ toggleActionsMenu, onRowExpand, row, visibleColumns, renderRowSubComponent }) {
  const rowProps = row.getRowProps();

  return (
    <>
      <tr {...row.getRowProps()}>
        {/*<td>
          <IconButton onClick={(e) => toggleActionsMenu(e, row)}>
            <Menu />
          </IconButton>
          {Boolean(onRowExpand) && (
            <IconButton onClick={() => console.log(row.original)}>
              {row.isExpanded ? <ArrowDropDown /> : <ArrowRight />}
            </IconButton>
          )}
          </td>*/}
        {row.cells.map((cell) => {
          return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
        })}
      </tr>
      {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns })}
    </>
  );
}
