import React from 'react';
import { DocumentService } from '../../../services';
import { Button } from '@mui/material';

export default function DownloadDocument({ id, name, protocolId }) {
  const downloadFile = () => {
    DocumentService.getDocumentBlobById(protocolId, id).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  return <Button onClick={downloadFile}>{name}</Button>;
}
