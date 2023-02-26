import { NotificationContext } from 'common/providers/NotificationProvider';
import { useContext } from 'react';

function useNotificationContext() {
  return useContext(NotificationContext);
}

export default useNotificationContext;
