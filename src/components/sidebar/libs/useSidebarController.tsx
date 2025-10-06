import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ProfileCircle, StatsUpSquare, Wallet } from 'iconoir-react';
import { EMenu } from '@/utils/enums';

const useSidebarController = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = (path: (typeof EMenu)[keyof typeof EMenu]) => {
    if (pathname === '/') {
      return path === EMenu.DASHBOARD;
    }
    return pathname.includes(path);
  };

  const menuItems = useMemo(
    () => [
      {
        label: 'Dashboard',
        value: EMenu.DASHBOARD,
        path: '/',
        icon: <StatsUpSquare />,
      },
      {
        label: 'Pembagian Otomatis',
        value: EMenu.PEMBAGIAN_OTOMATIS,
        path: '/pembagian-otomatis',
        icon: <Wallet />,
      },
      {
        label: 'Kelola Dokter',
        value: EMenu.KELOLA_DOKTER,
        path: '/dokter',
        icon: <ProfileCircle />,
      },
    ],
    []
  );

  return {
    navigate,
    isActive,
    menuItems,
    pathname,
  };
};

export default useSidebarController;
