import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DocumentService, ProtocolService } from '../../services';
import Protocol from './Protocol';
import Dialog from '../../components/Dialog/Dialog';
import { NoteAdd, Archive, Edit, ArrowDropDown, ArrowRight, Menu as MenuIcon, UploadFile } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import Subprotocols from './Subprotocols';
import Subprotocol from './Subprotocol';
import { ReactTable } from '../../components/ReactTable/ReactTable';
import { toastSuccess } from '../../common/providers/NotificationProvider';
import { useCallback } from 'react';
import { formatDate } from '../../common/utils';
import DownloadDocument from '../Administration/Documents/DownloadDocument';

export default function Protocols() {
  const [protocols, setProtocols] = useState([]);
  const [protocolDialogOpen, setProtocolDialogOpen] = useState(false);
  const [subprotocolsDialogOpen, setSubprotocolsDialogOpen] = useState(false);
  const [documentsDialogOpen, setDocumentsDialogOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [fileUploadProtocolId, setFileUploadProtocolId] = useState(null);

  const [protocol, setProtocol] = useState({
    id: null,
    protocolNumber: '',
    numberOfSubprotocols: 0,
    senderId: '',
    sender: '',
    subject: '',
    submissionDate: new Date().toISOString().substring(0, 10),
    year: 2022,
  });

  const protocolRef = useRef(null);
  const subprotocolsRef = useRef(null);

  const addRow = () => {
    setProtocol({
      id: null,
      protocolNumber: '',
      numberOfSubprotocols: 0,
      senderId: '',
      sender: '',
      subject: '',
      submissionDate: new Date(),
      year: 2022,
    });
    setIsEdit(false);
    setProtocolDialogOpen(true);
  };

  const editRow = useCallback((row) => {
    setProtocol(row.original);
    setIsEdit(true);
    setProtocolDialogOpen(true);
  }, []);

  useEffect(() => {
    (async () => {
      setProtocols(await ProtocolService.get());
    })();
  }, []);

  const onSaveSuccess = useCallback(() => {
    (async () => {
      setProtocols(await ProtocolService.get());
      setIsEdit(false);
      setProtocolDialogOpen(false);
    })();
  }, []);

  const onProtocolDialogSave = () => {
    if (isEdit) {
      protocolRef.current.onUpdate(onSaveSuccess);
    } else {
      protocolRef.current.onAdd(onSaveSuccess);
    }
  };

  const addSubprotocol = useCallback((row) => {
    setProtocol(row.original);
    setSubprotocolsDialogOpen(true);
  }, []);

  const onSubprotocolDialogSave = () => {
    subprotocolsRef.current.onSave(onSaveSuccess);
    setSubprotocolsDialogOpen(false);
    setProtocol({
      id: null,
      protocolNumber: '',
      numberOfSubprotocols: 0,
      senderId: '',
      sender: '',
      subject: '',
      submissionDate: '',
      year: 2022,
    });
  };

  const archiveProtocol = (row) => {
    ProtocolService.archiveProtocol(row.original.id).then((data) => toastSuccess(data));
  };

  function getSubRows(originalRow) {
    return ProtocolService.getAllSubprotocols(originalRow.id);
  }

  const addDocument = (row) => {
    setFileUploadProtocolId(row.original.id);
    fileUploadRef.current.click();
  };

  const onDocumentChange = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; ++i) {
      DocumentService.addDocument(fileUploadProtocolId, files[i]);
    }
  };

  function getDocuments(row) {
    (async () => {
      setDocuments(await DocumentService.getAllDocumentsForProtocol(row.original.id));
      setDocumentsDialogOpen(true);
    })();
  }

  const tableRef = useRef(null);
  const fileUploadRef = useRef(null);

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
            <IconButton {...row.getToggleRowExpandedProps()}>
              {row.isExpanded ? <ArrowDropDown /> : <ArrowRight />}
            </IconButton>
          </>
        ),
        SubCell: () => null,
      },
      { Header: 'Protocol number', accessor: 'protocolNumber' },
      { Header: 'Number of subprotocols', accessor: 'numberOfSubprotocols' },
      { Header: 'Sender', accessor: 'sender' },
      { Header: 'Subject', accessor: 'subject' },
      { Header: 'Submission date', accessor: (row) => <>{formatDate(row.submissionDate)}</> },
      { Header: 'Year', accessor: 'year' },
    ],
    []
  );

  const actions = useMemo(
    () => [
      {
        component: (
          <>
            <Edit /> Edit protocol
          </>
        ),
        onClick: editRow,
      },
      {
        component: (
          <>
            <Archive /> Archive protocol
          </>
        ),

        onClick: archiveProtocol,
      },
      {
        component: (
          <>
            <NoteAdd />
            Add subprotocol
          </>
        ),
        onClick: addSubprotocol,
      },
      {
        component: (
          <>
            <UploadFile />
            Add document
          </>
        ),
        onClick: addDocument,
      },
      {
        component: (
          <>
            <UploadFile />
            View documents
          </>
        ),
        onClick: getDocuments,
      },
    ],
    []
  );

  return (
    <>
      <input type='file' ref={fileUploadRef} style={{ visibility: 'hidden' }} multiple onChange={onDocumentChange} />
      <ReactTable
        columns={columns}
        data={protocols}
        actions={actions}
        onRowExpand={getSubRows}
        tableRef={tableRef}
        header={{ title: 'Protocols', onAdd: { onClick: addRow, tooltip: 'Add protocol' } }}
      />
      <Dialog
        open={protocolDialogOpen}
        title={protocol.id ? 'Edit protocol' : 'Create new protocol'}
        onClose={() => setProtocolDialogOpen(false)}
        onSave={onProtocolDialogSave}
      >
        <Protocol protocol={protocol} ref={protocolRef} />
      </Dialog>
      <Dialog
        open={subprotocolsDialogOpen}
        title='Add subprotocol'
        onClose={() => setSubprotocolsDialogOpen(false)}
        onSave={onSubprotocolDialogSave}
      >
        <Typography>Main protocol</Typography>
        <Subprotocol subprotocol={protocol} />
        <hr style={{ width: '100%' }} />
        <Subprotocols protocol={protocol} ref={subprotocolsRef} />
      </Dialog>
      <Dialog open={documentsDialogOpen} title={'Documents'} onClose={() => setDocumentsDialogOpen(false)}>
        {documents.map((document) => (
          <DownloadDocument {...document} />
        ))}
      </Dialog>
    </>
  );
}
