import { Input, type InputProps } from '@material-tailwind/react';

interface IInputWithLabelProps extends InputProps {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputWithLabel = ({ label, value, onChange, required, ...props }: IInputWithLabelProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-1">
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-sm font-medium text-red-500">*</span>}
        </label>
      </div>
      <Input value={value} onChange={onChange} {...props} />
    </div>
  );
};

export default InputWithLabel;
