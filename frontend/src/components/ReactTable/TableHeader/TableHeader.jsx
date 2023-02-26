import React from 'react';
import { useState } from 'react';
import AddButton from '../../Buttons/AddButton';
import GlobalFilter from './GlobalFilter';

function HeaderTitle({ header }) {
  return (
    <div className='table-header-title'>
      <h2>{header.title}</h2>
      <AddButton onClick={header.onAdd.onClick} tooltip={header.onAdd.tooltip} />
    </div>
  );
}

export default function TableHeader({ tableInstance, header, actions }) {
  const { headerGroups, setGlobalFilter, preGlobalFilteredRows, visibleColumns } = tableInstance;
  const [globalFilter] = useState(null);

  return (
    <thead>
      <tr>
        <th colSpan={visibleColumns.length}>
          <div className='table-header'>
            {Boolean(header) && <HeaderTitle header={header} />}
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </div>
        </th>
      </tr>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
