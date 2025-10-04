import { ReactNode } from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
};

export default function Button({
  label,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  icon,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 
        rounded-xl
        gap-2 flex items-center justify-center 
        font-semibold 
        text-white 
        bg-purple-950 
        hover:bg-purple-800 
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed 
        transition-colors duration-300 ease-in-out
        shadow-md hover:shadow-lg
        ${className}
      `}
    >
      {icon}
      {label}
    </button>
  );
}
