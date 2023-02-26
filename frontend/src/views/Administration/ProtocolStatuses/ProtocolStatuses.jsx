import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ProtocolStatusService } from '../../../services';
import ProtocolStatus from './ProtocolStatus';
import Dialog from '../../../components/Dialog/Dialog';
import { IconButton } from '@mui/material';
import { Edit, Menu as MenuIcon } from '@mui/icons-material';
import { ReactTable } from '../../../components/ReactTable/ReactTable';

export default function ProtocolStatuses() {
  const [protocolStatuses, setProtocolStatuses] = useState([]);
  const [protocolStatus, setProtocolStatus] = useState({ id: null, name: '', code: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [protocolStatusDialogOpen, setProtocolStatusDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const protocolStatusRef = useRef(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setProtocolStatuses(await ProtocolStatusService.get());
      setIsLoading(false);
    })();
  }, []);

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
      { Header: 'Protocol status name', accessor: 'name' },
      { Header: 'Protocol status code', accessor: 'code' },
    ],
    []
  );

  const addRow = () => {
    setProtocolStatus({ id: null, name: '', code: '' });
    setIsEdit(false);
    setProtocolStatusDialogOpen(true);
  };

  const editRow = (row) => {
    setProtocolStatus(row.original);
    setIsEdit(true);
    setProtocolStatusDialogOpen(true);
  };

  const onSaveSuccess = () => {
    (async () => {
      setIsLoading(true);
      setProtocolStatuses(await ProtocolStatusService.get());
      setIsEdit(false);
      setProtocolStatusDialogOpen(false);
      setIsLoading(false);
    })();
  };

  const onProtocolStatusDialogSave = () => {
    if (isEdit) {
      protocolStatusRef.current.onUpdate(onSaveSuccess);
    } else {
      protocolStatusRef.current.onAdd(onSaveSuccess);
    }
  };

  const tableRef = useRef(null);

  const actions = useMemo(
    () => [
      {
        component: (
          <>
            <Edit /> Edit protocol status
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
        data={protocolStatuses}
        actions={actions}
        tableRef={tableRef}
        header={{ title: 'Protocol statuses', onAdd: { onClick: addRow, tooltip: 'Add protocol status' } }}
      />

      <Dialog
        open={protocolStatusDialogOpen}
        title='Add protocol status'
        onClose={() => setProtocolStatusDialogOpen(false)}
        onSave={onProtocolStatusDialogSave}
      >
        <ProtocolStatus protocolStatus={protocolStatus} ref={protocolStatusRef} />
      </Dialog>
    </>
  );
}
