import { Bounce, toast } from 'react-toastify';

export const showError = (message) => {
  toast.error(message, {
    position: 'top-center',
    transition: Bounce,
    autoClose: 999999,
    hideProgressBar: true,
    theme: 'dark',
  });
};
