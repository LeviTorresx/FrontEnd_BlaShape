type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  label,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 
        rounded-xl 
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
      {label}
    </button>
  );
}
