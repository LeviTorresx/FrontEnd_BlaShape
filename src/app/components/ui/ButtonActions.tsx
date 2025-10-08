import React, { ReactNode } from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
};
export default function ButtonActions({
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
      className={
        " flex items-center gap-2 bg-gradient-to-r from-purple-900 to-purple-500  text-white font-medium px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer" +
        className
      }
    >
      {icon}
      {label}
    </button>
  );
}
