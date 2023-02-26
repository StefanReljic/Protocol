import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CompanyService } from '../../../services';
import Company from './Company';
import Dialog from '../../../components/Dialog/Dialog';
import { IconButton } from '@mui/material';
import { Edit, Menu as MenuIcon } from '@mui/icons-material';
import { ReactTable } from '../../../components/ReactTable/ReactTable';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState({ id: null, name: '', code: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [companyDialogOpen, setCompanyDialogOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [globalFilter, setGlobalFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const companyRef = useRef(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const companiesPage = await CompanyService.get({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        globalFilter,
      });
      setCompanies(companiesPage.content);
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
      { Header: 'Company name', accessor: 'name' },
      { Header: 'Company code', accessor: 'code' },
    ],
    []
  );

  const addRow = () => {
    setCompany({ id: null, name: '', code: '' });
    setIsEdit(false);
    setCompanyDialogOpen(true);
  };

  const editRow = (row) => {
    setCompany(row.original);
    setIsEdit(true);
    setCompanyDialogOpen(true);
  };

  const onSaveSuccess = () => {
    (async () => {
      setIsLoading(true);
      setCompanies(
        await CompanyService.get({
          pageNumber: pagination.pageIndex,
          pageSize: pagination.pageSize,
          globalFilter,
        })
      );
      setIsEdit(false);
      setCompanyDialogOpen(false);
      setIsLoading(false);
    })();
  };

  const onCompanyDialogSave = () => {
    if (isEdit) {
      companyRef.current.onUpdate(onSaveSuccess);
    } else {
      companyRef.current.onAdd(onSaveSuccess);
    }
  };

  const tableRef = useRef(null);

  const actions = useMemo(
    () => [
      {
        component: (
          <>
            <Edit /> Edit comapny
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
        data={companies}
        actions={actions}
        tableRef={tableRef}
        header={{ title: 'Companies', onAdd: { onClick: addRow, tooltip: 'Add company' } }}
      />

      <Dialog
        open={companyDialogOpen}
        title='Add company'
        onClose={() => setCompanyDialogOpen(false)}
        onSave={onCompanyDialogSave}
      >
        <Company company={company} ref={companyRef} />
      </Dialog>
    </>
  );
}
