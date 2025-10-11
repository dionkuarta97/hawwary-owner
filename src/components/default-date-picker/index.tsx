import { Datepicker } from 'flowbite-react';
import { useState } from 'react';

interface IDatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  label?: string;
  placeholder?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  showClearButton?: boolean;
}

const DatePicker = ({
  value,
  onChange,
  minDate,
  maxDate,
  label,
  placeholder,
  autoFocus = false,
  disabled = false,
  showClearButton = false,
}: IDatePickerProps) => {
  const [date, setDate] = useState<Date | null>(value || null);
  return (
    <div className="flex w-full flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <Datepicker
        tabIndex={-1}
        showClearButton={showClearButton}
        autoFocus={autoFocus}
        disabled={disabled}
        placeholder={placeholder}
        value={date}
        onChange={date => {
          setDate(date);
          onChange?.(date);
        }}
        minDate={minDate || undefined}
        maxDate={maxDate || undefined}
      />
    </div>
  );
};

export default DatePicker;
