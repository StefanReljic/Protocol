import axios from 'axios';
import { toastError, toastSuccess } from '../common/providers/NotificationProvider';
import { CrudService } from './CrudService';

export class UserService extends CrudService {
  constructor(path) {
    super(path);
  }

  async deactivateUser(username, { onSaveSuccess }) {
    try {
      console.log(username);
      const response = await axios.put(`${this.path}/${username}/deactivate`);
      if (onSaveSuccess) onSaveSuccess();
      toastSuccess('User deactivated successfully');
      return response.data;
    } catch (error) {
      toastError('Error has occured while deactivating user');
      return [];
    }
  }
}
