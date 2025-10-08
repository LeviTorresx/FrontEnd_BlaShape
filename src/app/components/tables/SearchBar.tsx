interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="relative w-full sm:w-64">
      <input
        type="text"
        value={value}
        placeholder={placeholder || "Buscar..."}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-3 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
  );
}
