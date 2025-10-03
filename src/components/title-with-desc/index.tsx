import Text from '../Text';

interface ITitleWithDescProps {
  title: string;
  desc: string;
}

const TitleWithDesc = ({ title, desc }: ITitleWithDescProps) => {
  return (
    <div className="flex flex-col gap pb-5">
      <Text className="text-2xl font-bold" text={title} />
      <Text className="text-sm text-gray-500" text={desc} />
      <div className="w-full h-0.5 my-2 rounded-full bg-gray-200" />
    </div>
  );
};

export default TitleWithDesc;
