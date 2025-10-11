import { cn } from '@/utils/cn';
import Text from '../Text';

interface IStatisticWithValueProps {
  title: string;
  value: string;
  className?: string;
}

const StatisticWithValue = (props: IStatisticWithValueProps) => {
  const { title, value, className } = props;
  return (
    <div
      className={cn(
        'flex flex-col gap-2 border justify-between border-gray-200 rounded-[10px] lg:w-[30%] w-full p-4 bg-white',
        className
      )}
    >
      <Text className="font-bold text-lg" text={title} />
      <Text text={`${value}`} />
    </div>
  );
};

export default StatisticWithValue;
