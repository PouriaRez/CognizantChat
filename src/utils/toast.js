/*
toast.js functionality:
  - Allows for a reusable instance of toast for errors
  
Last edited: 2/27/2026
*/

import { Bounce, toast } from 'react-toastify';

export const showError = (message) => {
  toast.error(message, {
    position: 'top-center',
    transition: Bounce,
    autoClose: 2000,
    hideProgressBar: false,
    theme: 'dark',
    pauseOnFocusLoss: false,
  });
};
