import { Flip, ToastContainer, toast as toastify } from 'react-toastify';
import { CheckCircle, InfoCircle } from 'iconoir-react';

export const DefaultToast = () => {
  return <ToastContainer position="top-right" />;
};

export default DefaultToast;

const ToastContent = ({ title, message }: { title: string; message: string }) => {
  return (
    <div className="flex flex-col py-2">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-sm text-white">{message}</p>
    </div>
  );
};
export const toast = {
  success: (title: string, message: string) => {
    toastify.success(<ToastContent title={title} message={message} />, {
      hideProgressBar: true,
      pauseOnHover: true,
      autoClose: 4000,
      theme: 'colored',
      icon: <CheckCircle className="h-full w-full" />,
      transition: Flip,
      style: {
        backgroundColor: '#008000',
      },
    });
  },
  error: (title: string, message: string) => {
    toastify.error(<ToastContent title={title} message={message} />, {
      hideProgressBar: true,
      pauseOnHover: true,
      autoClose: 4000,
      theme: 'colored',
      icon: <InfoCircle className="h-full w-full" />,
      transition: Flip,
      style: {
        backgroundColor: '#8B0000',
      },
    });
  },
};
