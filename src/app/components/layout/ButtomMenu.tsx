"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "../ui/Button";
import { FaChevronDown, FaChevronUp, FaSignOutAlt } from "react-icons/fa";
interface menuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
}

type Props = {
  selected: string;
  onSelect: (key: string) => void;
  mainMenu: menuItem[];
  bottomMenu: menuItem[];
  onLogout: () => void;
};

export default function BottomMenu({
  selected,
  onSelect,
  mainMenu,
  bottomMenu,
  onLogout,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-purple-900 text-white p-3 rounded-full shadow-lg hover:bg-purple-800 transition-colors"
      >
        {open ? <FaChevronDown /> : <FaChevronUp />}
      </button>

      {/* Fondo oscuro */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Menú deslizable */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white text-gray-500 rounded-t-2xl shadow-xl transform transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-700">
          <Image
            src="/images/logo2W.webp"
            alt="Logo"
            width={30}
            height={30}
            className="mr-2"
          />
          <h1 className="text-2xl  text-gray-500">Blashape</h1>
        </div>

        <div className="p-2 pb-10">
          {mainMenu.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                onSelect(item.key);
                setOpen(false);
              }}
              className={`flex items-center w-full gap-3 px-4 py-3 rounded-md text-left transition-colors ${
                selected === item.key
                  ? "bg-purple-200 text-purple-950"
                  : "hover:bg-gray-800"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="border-t border-gray-700 p-4 pt-2">
          <div className="pb-2 text-gray-400 text-sm">Cuenta</div>

          {bottomMenu.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                onSelect(item.key);
                setOpen(false);
              }}
              className={`flex items-center w-full gap-3 px-4 py-3 rounded-md text-left transition-colors ${
                selected === item.key
                  ? "bg-purple-200 text-purple-950"
                  : "hover:bg-gray-800"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <div className="flex justify-center">
            <Button
              label="Cerrar cesion"
              type="button"
              icon={<FaSignOutAlt />}
              onClick={onLogout}
            />
          </div>
          <div className="pt-4 mt-4 text-xs text-center text-gray-400 border-t">
            © 2025 Blashape
          </div>
        </div>
      </div>
    </>
  );
}
