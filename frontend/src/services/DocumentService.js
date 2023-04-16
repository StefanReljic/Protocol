import axios from 'axios';
import { toastError } from '../common/providers/NotificationProvider';
import { CrudService } from './CrudService';

export class DocumentService extends CrudService {
  constructor(path) {
    super(path);
  }

  async getAllDocumentsForProtocol(protocolId) {
    try {
      const response = await axios.get(`${protocolId}${this.path}`);
      return response.data;
    } catch (error) {
      toastError('Error has occured while fetching all documents for protocol with id ' + protocolId);
      return [];
    }
  }

  async getDocumentBlobById(protocolId, documentId) {
    try {
      const response = await axios.get(`${protocolId}${this.path}/${documentId}`);
      return new Blob([response.data], { type: response.headers['content-type'] });
    } catch (error) {
      toastError('Error has occured while fetching document with id ' + documentId);
      return [];
    }
  }

  async addDocument(protocolId, document) {
    let formData = new FormData();
    formData.append('protocolId', protocolId);
    formData.append('document', document);
    formData.append('documentName', document.name);
    console.log(`${protocolId}${this.path}`);
    try {
      const response = await axios.post(`${protocolId}${this.path}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      toastError('Error has occured while adding document ' + document.name + ' to protocol with id ' + protocolId);
      return [];
    }
  }
}
