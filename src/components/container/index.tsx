import { cn } from '@/utils/cn';

interface IContainerProps {
  children: React.ReactNode;
  className?: string;
  noContainer?: boolean; // Prop untuk menghapus class container
}

const Container = ({ children, className, noContainer = false }: IContainerProps) => {
  return (
    <div
      className={cn(
        'mx-auto px-[16px] lg:px-[32px] w-full min-h-[calc(100vh-70px)] flex flex-col',
        !noContainer && 'container', // Hanya tambahkan container jika noContainer = false
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
