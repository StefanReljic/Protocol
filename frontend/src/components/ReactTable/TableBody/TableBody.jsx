import React, { forwardRef, useImperativeHandle, useState } from 'react';
import TableActionsMenu from './TableActionsMenu';
import TableRow from './TableRow';

export const TableBody = forwardRef(({ tableInstance, actions, onRowExpand, columns, renderRowSubComponent }, ref) => {
  const { getTableBodyProps, rows, prepareRow, visibleColumns } = tableInstance;
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);

  const toggleActionsMenu = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const closeActionsMenu = () => {
    setAnchorEl(null);
  };

  useImperativeHandle(ref, () => ({
    toggleActionsMenu(event, row) {
      setAnchorEl(event.currentTarget);
      setCurrentRow(row);
    },
  }));

  return (
    <tbody {...getTableBodyProps()}>
      <TableActionsMenu anchorEl={anchorEl} onClose={closeActionsMenu} actions={actions} row={currentRow} />
      {rows.map((row) => {
        prepareRow(row);
        return (
          <>
            <TableRow
              onRowExpand={onRowExpand}
              toggleActionsMenu={toggleActionsMenu}
              row={row}
              columns={columns}
              renderRowSubComponent={renderRowSubComponent}
              visibleColumns={visibleColumns}
            />
          </>
        );
      })}
    </tbody>
  );
});
