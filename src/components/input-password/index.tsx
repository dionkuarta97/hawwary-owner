import { Input, type InputProps } from '@material-tailwind/react';
import { Eye, EyeClosed } from 'iconoir-react';
import { useState } from 'react';

interface IInputPasswordProps extends InputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const InputPassword = ({ placeholder, value, onChange, label, ...props }: IInputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-row w-full  relative items-center">
        <Input
          autoComplete="new-password"
          type={showPassword ? 'text' : 'password'}
          className="rounded-r-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />

        <div
          className="p-2 cursor-pointe  rounded-r-md shadow-sm bg-gray-100 border-1 border-gray-200"
          onClick={handleShowPassword}
        >
          {showPassword ? (
            <Eye className="h-full text-gray-400 w-full" />
          ) : (
            <EyeClosed className="h-full text-gray-400 w-full" />
          )}
        </div>
      </div>
    </div>
  );
};

export default InputPassword;
