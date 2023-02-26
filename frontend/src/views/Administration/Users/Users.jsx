import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MaterialTable } from '../../../components/MaterialTable/MaterialTable';
import { UserService } from '../../../services';
import Dialog from '../../../components/Dialog/Dialog';
import User from './User';
import { ReactTable } from '../../../components/ReactTable/ReactTable';
import { Edit, Menu as MenuIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordRepeat: '',
    email: '',
    isActive: 'YES',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [organizationUnitDialogOpen, setUserDialogOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userRef = useRef(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const usersPage = await UserService.get({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        globalFilter,
      });
      setUsers(usersPage.content);
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
      { Header: 'Username', accessor: 'username' },
      { Header: 'First name', accessor: 'firstName' },
      { Header: 'Last name', accessor: 'lastName' },
      { Header: 'E-mail', accessor: 'email' },
      { Header: 'Is user active', accessor: 'isActive' },
    ],
    []
  );

  const addRow = () => {
    setUser({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordRepeat: '',
      email: '',
      isActive: 'YES',
    });
    setIsEdit(false);
    setUserDialogOpen(true);
  };

  const editRow = (row) => {
    setUser(row.original);
    setIsEdit(true);
    setUserDialogOpen(true);
  };

  const onSaveSuccess = () => {
    (async () => {
      setIsLoading(true);
      const usersPage = await UserService.get({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        globalFilter,
      });
      setUsers(usersPage.content);
      setIsEdit(false);
      setUserDialogOpen(false);
      setIsLoading(false);
    })();
  };

  const onUserDialogSave = () => {
    if (isEdit) {
      userRef.current.onUpdate(onSaveSuccess);
    } else {
      userRef.current.onAdd(onSaveSuccess);
    }
  };

  const tableRef = useRef(null);

  const actions = useMemo(
    () => [
      {
        component: (
          <>
            <Edit /> Edit user
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
        data={users}
        actions={actions}
        tableRef={tableRef}
        header={{ title: 'Users', onAdd: { onClick: addRow, tooltip: 'Add user' } }}
      />

      <Dialog
        open={organizationUnitDialogOpen}
        title='Add user'
        onClose={() => setUserDialogOpen(false)}
        onSave={onUserDialogSave}
      >
        <User user={user} ref={userRef} />
      </Dialog>
    </>
  );
}
