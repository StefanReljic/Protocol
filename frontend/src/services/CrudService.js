import axios from 'axios';
import { toastError, toastSuccess } from '../common/providers/NotificationProvider';

export class CrudService {
  #path;

  constructor(path) {
    this.#path = path;
  }

  async get(pagination) {
    try {
      let queryParams = '';
      if (pagination) {
        const { pageNumber, pageSize, globalFilter } = pagination;
        queryParams = `?pageNumber=${pageNumber}&pageSize=${pageSize}&globalFilter=${globalFilter}`;
      }
      const response = await axios.get(`${this.#path}${queryParams}`);
      return response.data;
    } catch (error) {
      toastError('Error has occured while fetching organization units');
      return [];
    }
  }

  async getIdLabelObjects() {
    try {
      const response = await axios.get(this.#path + '/lov');
      return response.data;
    } catch (error) {
      toastError('Error has occured while fetching organization units');
      return [];
    }
  }

  async add(object, { onError, onSuccess }) {
    try {
      const response = await axios.post(this.#path, object);
      toastSuccess(response.data);
      if (onSuccess) onSuccess();
    } catch (error) {
      onError(error);
      toastError('Error has occured');
    }
  }

  async update(object, { onSuccess, onError }) {
    try {
      const response = await axios.put(this.#path, object);
      toastSuccess(response.data);
      if (onSuccess) onSuccess();
    } catch (error) {
      onError(error);
      toastError('Error has occured');
    }
  }

  get path() {
    return this.#path;
  }
}
