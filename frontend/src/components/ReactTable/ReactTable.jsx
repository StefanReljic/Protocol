import React, { useCallback, useEffect } from 'react';
import { useExpanded, useGlobalFilter, useTable } from 'react-table';
import TableHeader from './TableHeader/TableHeader';
import { TableBody } from './TableBody/TableBody';

function SubRowAsync({ row, rowProps, visibleColumns, onRowExpand }) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onRowExpand(row.original).then((data) => setData(data));
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <SubRows row={row} rowProps={rowProps} visibleColumns={visibleColumns} data={data} loading={loading} />;
}

function SubRows({ row, rowProps, visibleColumns, data, loading }) {
  if (loading) {
    return (
      <tr>
        <td />
        <td colSpan={visibleColumns.length - 1}>Loading...</td>
      </tr>
    );
  }

  if (data.length === 0) {
    return (
      <tr>
        <td />
        <td colSpan={visibleColumns.length - 1}>No subrows to show</td>
      </tr>
    );
  }

  return (
    <>
      {data.map((x, i) => {
        return (
          <tr {...rowProps} key={`${rowProps.key}-expanded-${i}`}>
            {row.cells.map((cell) => {
              return (
                <td {...cell.getCellProps()}>
                  {cell.render(cell.column.SubCell ? 'SubCell' : 'Cell', {
                    value: cell.column.accessor && cell.column.accessor(x, i),
                    row: { ...row, original: x },
                  })}
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
}

export const ReactTable = ({ columns, data, header, actions, onRowExpand, tableRef }) => {
  const tableInstance = useTable({ columns, data }, useGlobalFilter, useExpanded);
  const { getTableProps } = tableInstance;

  const renderRowSubComponent = useCallback(
    ({ row, rowProps, visibleColumns }) => (
      <SubRowAsync row={row} rowProps={rowProps} visibleColumns={visibleColumns} onRowExpand={onRowExpand} />
    ),
    []
  );

  return (
    <table {...getTableProps()}>
      <TableHeader tableInstance={tableInstance} header={header} />
      <TableBody
        tableInstance={tableInstance}
        actions={actions}
        onRowExpand={onRowExpand}
        columns={columns}
        renderRowSubComponent={renderRowSubComponent}
        ref={tableRef}
      />
    </table>
  );
};
