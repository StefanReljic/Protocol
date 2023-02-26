import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MaterialTable } from '../../../components/MaterialTable/MaterialTable';
import { OrganizationUnitService } from '../../../services';
import OrganizationUnit from './OrganizationUnit';
import Dialog from '../../../components/Dialog/Dialog';
import { IconButton } from '@mui/material';
import { Edit, Menu as MenuIcon } from '@mui/icons-material';
import { ReactTable } from '../../../components/ReactTable/ReactTable';

export default function OrganizationUnits() {
  const [organizationUnits, setOrganizationUnits] = useState([]);
  const [organizationUnit, setOrganizationUnit] = useState({ id: null, name: '', code: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [organizationUnitDialogOpen, setOrganizationUnitDialogOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(10);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const organizationUnitRef = useRef(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const organizationUnitsPage = await OrganizationUnitService.get({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        globalFilter,
      });
      setOrganizationUnits(organizationUnitsPage.content);
      setIsLoading(false);
    })();
  }, [globalFilter, pagination]);

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: 'expander',
        Cell: ({ row }) => (
          <>
            <IconButton onClick={(e) => tableRef.current.toggleActionsMenu(e, row)}>
              <MenuIcon />
            </IconButton>
          </>
        ),
      },
      { Header: 'Organization unit name', accessor: 'name' },
      { Header: 'Organization unit code', accessor: 'code' },
    ],
    []
  );

  const addRow = () => {
    setOrganizationUnit({ id: null, name: '', code: '' });
    setIsEdit(false);
    setOrganizationUnitDialogOpen(true);
  };

  const editRow = (row) => {
    setOrganizationUnit(row.original);
    setIsEdit(true);
    setOrganizationUnitDialogOpen(true);
  };

  const onSaveSuccess = () => {
    (async () => {
      setIsLoading(true);
      const organizationUnitsPage = await OrganizationUnitService.get({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        globalFilter,
      });
      setOrganizationUnits(organizationUnitsPage.content);
      setPageCount(organizationUnitsPage.totalPages);
      setIsEdit(false);
      setOrganizationUnitDialogOpen(false);
      setIsLoading(false);
    })();
  };

  const onOrganizationUnitDialogSave = () => {
    if (isEdit) {
      organizationUnitRef.current.onUpdate(onSaveSuccess);
    } else {
      organizationUnitRef.current.onAdd(onSaveSuccess);
    }
  };

  const tableRef = useRef(null);

  const actions = useMemo(
    () => [
      {
        component: (
          <>
            <Edit /> Edit organization unit
          </>
        ),
        onClick: editRow,
      },
    ],
    []
  );

  return (
    <>
      <ReactTable
        columns={columns}
        data={organizationUnits}
        actions={actions}
        tableRef={tableRef}
        header={{ title: 'Organization units', onAdd: { onClick: addRow, tooltip: 'Add organization unit' } }}
      />

      <Dialog
        open={organizationUnitDialogOpen}
        title='Add organization unit'
        onClose={() => setOrganizationUnitDialogOpen(false)}
        onSave={onOrganizationUnitDialogSave}
      >
        <OrganizationUnit organizationUnit={organizationUnit} ref={organizationUnitRef} />
      </Dialog>
    </>
  );
}
