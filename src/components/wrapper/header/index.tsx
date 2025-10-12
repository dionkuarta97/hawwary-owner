import Container from '@/components/container';
import Sidebar from '@/components/sidebar';
import Text from '@/components/Text';
import { Menu, Xmark } from 'iconoir-react';
import { Outlet } from 'react-router';
import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="w-full  items-center h-[70px] flex py-4 border-b border-gray-200 shadow-sm bg-white sticky top-0 z-50">
        <Container noContainer className="h-fit !mx-0 w-full min-h-[0px]">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div
                onClick={() => (!isOpen ? setIsOpen(true) : setIsOpen(false))}
                className="w-5 h-5 flex lg:hidden cursor-pointer items-center justify-center"
              >
                {isOpen ? <Xmark className="w-full h-full" /> : <Menu className="w-full h-full" />}
              </div>
              <Text text="Hawwary Owner" className="text-xl font-bold" />
            </div>
          </div>
        </Container>
      </div>
      <div className="w-full flex flex-col lg:flex-row min-h-0">
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <div className="w-full flex-1 min-w-0 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Header;
