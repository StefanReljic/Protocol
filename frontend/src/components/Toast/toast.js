import { toast } from 'react-toastify';

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
