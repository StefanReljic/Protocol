import axios from 'axios';
import { toastError } from '../common/providers/NotificationProvider';
import { CrudService } from './CrudService';

export class ProtocolService extends CrudService {
  constructor(path) {
    super(path);
  }

  async getAllProtocolsWithoutParent(protocolId) {
    try {
      const pathVariable = protocolId ? protocolId : '';
      const response = await axios.get(`${this.path}/available-subprotocols/${pathVariable}`);
      return response.data;
    } catch (error) {
      toastError('Error has occured while fetching all protocols without parent protocol');
      return [];
    }
  }

  async getAllSubprotocols(protocolId) {
    try {
      const response = await axios.get(`${this.path}/${protocolId}/subprotocols`);
      return response.data;
    } catch (error) {
      toastError('Error has occured while fetching all subprotocols');
      return [];
    }
  }

  async addSubprotocols(protocolId, protocolIds) {
    try {
      const response = await axios.post(`${this.path}/${protocolId}/subprotocols`, protocolIds);
      return response.data;
    } catch (error) {
      toastError('Error has occured while adding subprotocols');
      return [];
    }
  }

  async archiveProtocol(protocolId) {
    try {
      const response = await axios.put(`${this.path}/${protocolId}/archive`);
      return response.data;
    } catch (error) {
      toastError('Error has occured while archiving protocol with id ' + protocolId);
      return [];
    }
  }

  async addDocument(protocolId, document) {
    let formData = new FormData();
    formData.append('protocolId', document);
    formData.append('document', document);
    formData.append('documentName', document.name);

    try {
      const response = await axios.post(`${this.path}/${protocolId}/documents`, formData, {
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
