import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="relative w-full sm:w-72">
      {/* Icono */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-900 text-sm">
        <FaSearch />
      </span>

      {/* Input */}
      <input
        type="text"
        value={value}
        placeholder={placeholder || "Buscar..."}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full pl-9 pr-3 py-2.5 text-sm text-gray-800
          bg-white border border-gray-200 rounded-xl
          shadow-sm focus:shadow-md
          placeholder-gray-400
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-purple-500
        "
      />
    </div>
  );
}
