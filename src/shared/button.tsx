import { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="px-6 h-10 rounded-lg bg-green-600 font-medium hover:bg-green-500 transition-colors"
      {...props}>
      {children}
    </button>
  );
};
