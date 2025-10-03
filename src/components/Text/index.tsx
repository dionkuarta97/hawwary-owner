import { cn } from '@/utils/cn';
import { Typography } from '@material-tailwind/react';

interface ITextProps {
  text: string;
  className?: string;
}

const Text = ({ text, className }: ITextProps) => {
  return (
    <Typography className={cn('text-gray-800 text-base font-normal', className)}>{text}</Typography>
  );
};

export default Text;
