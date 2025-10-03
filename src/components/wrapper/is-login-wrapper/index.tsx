import { useAtomValue } from 'jotai';
import authStore from '@/store/auth';

import { Navigate, Outlet } from 'react-router';

const IsLoginWrapper = () => {
  const token = useAtomValue(authStore.token);
  const isAuthenticated = !!token;
  return <>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default IsLoginWrapper;
