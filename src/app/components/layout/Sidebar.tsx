"use client";

import Image from "next/image";
import {
  FaHome,
  FaTools,
  FaUsers,
  FaChartBar,
  FaUserCircle,
  FaBuilding,
  FaSignOutAlt,
} from "react-icons/fa";

type Props = {
  selected: string;
  onSelect: (key: string) => void;
};

export default function Sidebar({ selected, onSelect }: Props) {
  const mainMenu = [
    { key: "home", label: "Inicio", icon: <FaHome /> },
    { key: "furniture", label: "Muebles", icon: <FaTools /> },
    { key: "clients", label: "Clientes", icon: <FaUsers /> },
    { key: "reports", label: "Reportes", icon: <FaChartBar /> },
  ];

  const bottomMenu = [
    { key: "profile", label: "Perfil", icon: <FaUserCircle /> },
    { key: "workshop", label: "Taller", icon: <FaBuilding /> },
    { key: "logout", label: "Cerrar sesión", icon: <FaSignOutAlt /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col rounded-2xl">
      {/* Header */}
      <div className="h-16 flex items-center justify-center">
        <Image
          src="/images/logo2W.webp"
          alt="Logo"
          width={30}
          height={30}
          className="mr-2"
        />
        <h1 className="text-2xl  text-gray-500">Blashape</h1>
      </div>

      {/* Main menu */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="p-4 border-b border-gray-300 text-gray-500">
          Menú principal
        </div>

        {mainMenu.map((item) => (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className={`flex items-center w-full gap-3 px-4 py-2 rounded-md transition-colors
              ${
                selected === item.key
                  ? "bg-purple-100 text-purple-950 font-medium"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom menu */}
      <div className="border-t border-gray-300 p-4 space-y-2">
        <div className="pb-2 text-gray-400">Cuenta</div>

        {bottomMenu.map((item) => (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className={`flex items-center w-full gap-3 px-4 py-2 rounded-md transition-colors
              ${
                selected === item.key
                  ? "bg-purple-100 text-purple-950 font-medium"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}

        <div className="pt-4 text-xs text-center text-gray-400 border-t">
          © 2025 Blashape
        </div>
      </div>
    </aside>
  );
}
