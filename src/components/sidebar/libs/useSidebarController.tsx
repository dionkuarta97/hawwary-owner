import { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Hospital, ProfileCircle, StatsUpSquare, User, Wallet } from 'iconoir-react';
import { EMenu } from '@/utils/enums';

const useSidebarController = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpenCollapse, setIsOpenCollapse] = useState(false);

  // Auto open collapse when one of the master data menus is active
  useEffect(() => {
    const isMasterDataActive =
      pathname.includes(EMenu.STAFF) ||
      pathname.includes(EMenu.PEMBAGIAN_OTOMATIS) ||
      pathname.includes(EMenu.KELOLA_DOKTER) ||
      pathname.includes(EMenu.KELOLA_DANTEL);

    if (isMasterDataActive) {
      setIsOpenCollapse(true);
    }
  }, [pathname]);

  // Function to toggle collapse - allow manual toggle
  const toggleCollapse = () => {
    setIsOpenCollapse(prev => !prev);
  };
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
    ],
    []
  );

  const masterDataItems = useMemo(
    () => [
      {
        label: 'Staff',
        value: EMenu.STAFF,
        path: '/staff',
        icon: <User />,
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
        path: '/kelola-dokter',
        icon: <ProfileCircle />,
      },
      {
        label: 'Kelola Dantel',
        value: EMenu.KELOLA_DANTEL,
        path: '/kelola-dantel',
        icon: <Hospital />,
      },
    ],
    [isOpenCollapse]
  );

  const isMasterDataActive = useMemo(() => {
    return (
      !isOpenCollapse &&
      (pathname.includes(EMenu.STAFF) ||
        pathname.includes(EMenu.PEMBAGIAN_OTOMATIS) ||
        pathname.includes(EMenu.KELOLA_DOKTER) ||
        pathname.includes(EMenu.KELOLA_DANTEL))
    );
  }, [pathname, isOpenCollapse]);

  return {
    navigate,
    isActive,
    menuItems,
    pathname,
    isOpenCollapse,
    setIsOpenCollapse,
    toggleCollapse,
    masterDataItems,
    isMasterDataActive,
  };
};

export default useSidebarController;
