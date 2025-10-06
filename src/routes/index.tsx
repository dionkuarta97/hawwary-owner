import Dashboard from '../pages/dashboard';
import { createBrowserRouter, RouterProvider } from 'react-router';
import IsLoginWrapper from '@/components/wrapper/is-login-wrapper';
import NotLoginWrapper from '@/components/wrapper/not-login-wrapper';
import Login from '@/pages/login';
import Header from '@/components/wrapper/header';
import PembagianOtomatis from '@/pages/pembagian-otomatis';
import DokterPage from '@/pages/dokter';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <IsLoginWrapper />,
    children: [
      {
        path: '/',
        element: <Header />,
        children: [
          {
            path: '/',
            element: <Dashboard />,
          },
          {
            path: '/pembagian-otomatis',
            element: <PembagianOtomatis />,
          },
          {
            path: '/dokter',
            element: <DokterPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <NotLoginWrapper />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={routes} />;
};

export default Routes;
