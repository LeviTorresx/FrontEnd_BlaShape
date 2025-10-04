"use client";

import Image from "next/image";
import Button from "../ui/Button";
import { ReactNode } from "react";
import { FaSignOutAlt } from "react-icons/fa";

interface menuItem {
  key: string;
  label: string;
  icon: ReactNode;
}


type Props = {
  selected: string;
  onSelect: (key: string) => void;
  mainMenu: menuItem[];
  bottomMenu: menuItem[];
};

export default function Sidebar({ selected, onSelect, mainMenu, bottomMenu }: Props) {
  

  return (
    <aside className="hidden md:flex w-64 bg-white shadow-md flex-col rounded-2xl">
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
            className={`flex items-center w-full gap-3 px-4 py-2 rounded-md transition-colors cursor-pointer
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
            className={`flex items-center w-full gap-3 px-4 py-2 rounded-md transition-colors cursor-pointer
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
        <div className="flex justify-center">
          <Button label="Cerrar cesion" type="button" icon={<FaSignOutAlt />} />
        </div>

        <div className="pt-4 text-xs text-center text-gray-400 border-t">
          © 2025 Blashape
        </div>
      </div>
    </aside>
  );
}
