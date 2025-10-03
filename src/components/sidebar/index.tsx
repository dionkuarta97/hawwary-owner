import { Card, List } from '@material-tailwind/react';
import { useEffect } from 'react';
import useSidebarController from './libs/useSidebarController';
import { LogOut } from 'iconoir-react';

interface ISidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
const Sidebar = ({ isOpen, onClose }: ISidebarProps) => {
  const { isActive, navigate, menuItems } = useSidebarController();

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
        className={`max-w-[280px] h-[calc(100vh-70px)] rounded-none absolute lg:sticky top-[70px] left-0 shadow-none transition-transform duration-300 ease-in-out lg:translate-x-0 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Card.Body className="p-3 flex flex-col h-full">
          <List className="flex-1">
            {menuItems.map(item => (
              <List.Item
                key={item.value}
                onClick={() => {
                  navigate(item.path);
                  onClose(); // Tutup sidebar setelah navigasi di mobile
                }}
                className={`cursor-pointer ${
                  isActive(item.value) ? 'bg-surface text-primary' : ''
                }`}
              >
                <List.ItemStart>{item.icon}</List.ItemStart>
                {item.label}
              </List.Item>
            ))}
          </List>
          <List>
            <hr className="my-4 border-gray-200 -mx-3" />
            <List.Item
              className="cursor-pointer"
              onClick={() => {
                navigate('/login');
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
