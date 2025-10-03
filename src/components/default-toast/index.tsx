import { ToastContainer, toast as toastify } from 'react-toastify';

export const DefaultToast = () => {
  return <ToastContainer position="top-right" />;
};

export default DefaultToast;

const ToastContent = ({ title, message }: { title: string; message: string }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
};
export const toast = {
  success: (title: string, message: string) => {
    toastify.success(<ToastContent title={title} message={message} />);
  },
  error: (title: string, message: string) => {
    toastify.error(<ToastContent title={title} message={message} />);
  },
};
