import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NotificationContext = React.createContext({
  toastInfo: () => {},
  toastSuccess: () => {},
  toastWarning: () => {},
  toastError: () => {},
});

const toastObject = {
  position: 'bottom-left',
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export function toastInfo(message) {
  toast.info(message, toastObject);
}

export function toastSuccess(message) {
  toast.success(message, toastObject);
}

export function toastWarning(message) {
  toast.warning(message, toastObject);
}

export function toastError(message) {
  toast.error(message, toastObject);
}

export default function NotificationProvider({ children }) {
  const contextValue = { toastInfo, toastSuccess, toastWarning, toastError };

  return (
    <NotificationContext.Provider value={contextValue}>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      {children}
    </NotificationContext.Provider>
  );
}
