import { Card, Collapse, List } from '@material-tailwind/react';
import { useEffect } from 'react';
import useSidebarController from './libs/useSidebarController';
import { Bank, Database, LogOut, NavArrowRight } from 'iconoir-react';

interface ISidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
const Sidebar = ({ isOpen, onClose }: ISidebarProps) => {
  const {
    isActive,
    navigate,
    menuItems,
    toggleCollapse,
    masterDataItems,
    isOpenCollapse,
    isMasterDataActive,
    isLayananActive,
    LayananItems,
    toggleCollapseLayanan,
    isOpenCollapseLayanan,
    logout,
  } = useSidebarController();

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop untuk mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <Card
        className={`w-[300px] min-w-[300px] max-w-[300px] h-[calc(100vh-70px)] overflow-x-hidden rounded-none fixed lg:sticky top-[70px] left-0 shadow-none transition-transform duration-300 ease-in-out lg:translate-x-0 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Card.Body className="p-3 flex flex-col h-full">
          <List className="flex-1 overflow-y-auto overflow-x-hidden">
            {menuItems.map(item => (
              <List.Item
                selected={isActive(item.value)}
                key={item.value}
                onClick={() => {
                  navigate(item.path);
                  onClose(); // Tutup sidebar setelah navigasi di mobile
                }}
                className={`cursor-pointer items-center`}
              >
                <List.ItemStart>{item.icon}</List.ItemStart>
                {item.label}
              </List.Item>
            ))}
            <hr className="my-2 border-gray-200 -mx-3" />
            <List.Item
              selected={isMasterDataActive}
              onClick={toggleCollapse}
              className="cursor-pointer items-center"
            >
              <List.ItemStart>
                <Database />
              </List.ItemStart>
              Master Data
              <List.ItemEnd>
                <NavArrowRight
                  className={`h-4 w-4 transition-transform ${isOpenCollapse ? 'rotate-90' : ''}`}
                />
              </List.ItemEnd>
            </List.Item>
            <Collapse open={isOpenCollapse}>
              <List>
                {masterDataItems.map(item => (
                  <List.Item
                    selected={isActive(item.value)}
                    key={item.value}
                    onClick={() => {
                      navigate(item.path);
                      onClose();
                    }}
                    className="cursor-pointer items-center"
                  >
                    <List.ItemStart>{item.icon}</List.ItemStart>
                    {item.label}
                  </List.Item>
                ))}
              </List>
            </Collapse>
            <hr className="my-2 border-gray-200 -mx-3" />
            <List.Item
              selected={isLayananActive}
              onClick={toggleCollapseLayanan}
              className="cursor-pointer items-center"
            >
              <List.ItemStart>
                <Bank />
              </List.ItemStart>
              Layanan & Transaksi
              <List.ItemEnd>
                <NavArrowRight
                  className={`h-4 w-4 transition-transform ${
                    isOpenCollapseLayanan ? 'rotate-90' : ''
                  }`}
                />
              </List.ItemEnd>
            </List.Item>
            <Collapse open={isOpenCollapseLayanan}>
              <List>
                {LayananItems.map(item => (
                  <List.Item
                    selected={isActive(item.value)}
                    key={item.value}
                    onClick={() => {
                      navigate(item.path);
                      onClose();
                    }}
                    className="cursor-pointer items-center"
                  >
                    <List.ItemStart>{item.icon}</List.ItemStart>
                    {item.label}
                  </List.Item>
                ))}
              </List>
            </Collapse>
          </List>
          <List>
            <hr className="my-2 border-gray-200 -mx-3" />
            <List.Item
              className="cursor-pointer items-center"
              onClick={() => {
                logout();
                onClose();
              }}
            >
              <List.ItemStart>
                <LogOut />
              </List.ItemStart>
              Logout
            </List.Item>
          </List>
        </Card.Body>
      </Card>
    </>
  );
};

export default Sidebar;
