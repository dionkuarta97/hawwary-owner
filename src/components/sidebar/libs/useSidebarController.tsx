import { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  CardWallet,
  Hospital,
  ProfileCircle,
  StatsUpSquare,
  User,
  Wallet,
  SubmitDocument,
} from 'iconoir-react';
import { EMenu } from '@/utils/enums';

const useSidebarController = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpenCollapse, setIsOpenCollapse] = useState(false);
  const [isOpenCollapseLayanan, setIsOpenCollapseLayanan] = useState(false);
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
    const isLayananActive =
      pathname.includes(EMenu.PASIEN) ||
      pathname.includes(EMenu.TRANSAKSI) ||
      pathname.includes(EMenu.FEE_DISTRIBUTION) ||
      pathname.includes(EMenu.OPERASIONAL);

    if (isLayananActive) {
      setIsOpenCollapseLayanan(true);
    }
  }, [pathname]);

  // Function to toggle collapse - allow manual toggle
  const toggleCollapse = () => {
    setIsOpenCollapse(prev => !prev);
  };
  const toggleCollapseLayanan = () => {
    setIsOpenCollapseLayanan(prev => !prev);
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

  const LayananItems = useMemo(
    () => [
      {
        label: 'Data Pasien',
        value: EMenu.PASIEN,
        path: '/pasien',
        icon: <User />,
      },
      {
        label: 'Transaksi',
        value: EMenu.TRANSAKSI,
        path: '/transaksi',
        icon: <Wallet />,
      },
      {
        label: 'Fee Distribution',
        value: EMenu.FEE_DISTRIBUTION,
        path: '/fee-distribution',
        icon: <CardWallet />,
      },
      {
        label: 'Operasional',
        value: EMenu.OPERASIONAL,
        path: '/operasional',
        icon: <SubmitDocument />,
      },
    ],
    [isOpenCollapseLayanan]
  );
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };
  const isMasterDataActive = useMemo(() => {
    return (
      !isOpenCollapse &&
      (pathname.includes(EMenu.STAFF) ||
        pathname.includes(EMenu.PEMBAGIAN_OTOMATIS) ||
        pathname.includes(EMenu.KELOLA_DOKTER) ||
        pathname.includes(EMenu.KELOLA_DANTEL))
    );
  }, [pathname, isOpenCollapse]);
  const isLayananActive = useMemo(() => {
    return (
      !isOpenCollapseLayanan &&
      (pathname.includes(EMenu.PASIEN) ||
        pathname.includes(EMenu.TRANSAKSI) ||
        pathname.includes(EMenu.FEE_DISTRIBUTION) ||
        pathname.includes(EMenu.OPERASIONAL))
    );
  }, [pathname, isOpenCollapseLayanan]);

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
    isOpenCollapseLayanan,
    setIsOpenCollapseLayanan,
    toggleCollapseLayanan,
    LayananItems,
    isLayananActive,
    logout,
  };
};

export default useSidebarController;
