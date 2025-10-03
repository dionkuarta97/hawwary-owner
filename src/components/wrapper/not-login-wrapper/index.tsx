import { Navigate, Outlet } from 'react-router';
import { useAtomValue } from 'jotai';
import authStore from '@/store/auth';

const NotLoginWrapper = () => {
  const token = useAtomValue(authStore.token);
  const isNotAuthenticated = !token;
  return <>{isNotAuthenticated ? <Outlet /> : <Navigate to="/" />}</>;
};

export default NotLoginWrapper;
