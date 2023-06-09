import { toast } from "react-toastify";

export const ToastMessage = (message, type) => {
  toast(<p className='toastMessage'>{message}</p>, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    type,
  });
};
