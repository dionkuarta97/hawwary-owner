const LabelWithValue = ({
  label,
  value,
  content,
  variant = 'default',
}: {
  label: string;
  value?: string;
  content?: React.ReactNode;
  variant?: 'default' | 'inline';
}) => {
  return variant === 'default' ? (
    <div className="flex flex-col border-b border-gray-300 pb-2 gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {content ? content : <span className="text-md font-bold text-gray-700">{value}</span>}
    </div>
  ) : (
    <div className="flex flex-row justify-between gap-1">
      <label className="text-md font-medium text-gray-400">{label}</label>
      {content ? content : <span className="text-md font-bold text-gray-700">{value}</span>}
    </div>
  );
};

export default LabelWithValue;
