import { FC } from "react";

interface RangeProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

export const Range: FC<RangeProps> = ({
  label,
  onChange,
  value = 50,
  ...props
}) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-1 w-full">
      <label htmlFor={label}>{label}</label>
      <input
        type="range"
        name={label}
        value={value}
        onChange={onChangeHandler}
        {...props}
        className="w-full"
      />
    </div>
  );
};
