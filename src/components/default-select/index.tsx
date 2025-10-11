import { Select } from '@material-tailwind/react';

interface IDefaultSelectProps {
  options: { label: string; value: string }[];
  placeholder: string;
  onSelect: (value: string) => void;
  value: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

const DefaultSelect = ({
  options,
  placeholder,
  onSelect,
  value,
  label,
  required,
  disabled,
}: IDefaultSelectProps) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-sm font-medium text-red-500">*</span>}
        </label>
      )}
      <Select value={value} onChange={onSelect} className="bg-white" size="md" disabled={disabled}>
        <Select.Trigger value={value} defaultValue={value} placeholder={placeholder} />
        <Select.List>
          {options.map(option => (
            <Select.Option
              key={option.value}
              value={option.value}
              onClick={() => onSelect(option.value)}
            >
              {option.label}
            </Select.Option>
          ))}
        </Select.List>
      </Select>
    </div>
  );
};

export default DefaultSelect;
