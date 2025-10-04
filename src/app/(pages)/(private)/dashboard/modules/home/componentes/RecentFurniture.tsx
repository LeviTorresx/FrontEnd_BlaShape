"use client";

import { useEffect, useState } from "react";
import FurnitureCard from "./FurnitureCard";

interface FurnitureProps {
  image: string;
  name: string;
  startDate: string;
  endDate: string;
}
type Props = {
  furnitureList: FurnitureProps[];
};

export default function RecentFurniture({ furnitureList }: Props) {
  const [visibleCount, setVisibleCount] = useState(6);

  // 🔹 Detectar tamaño de pantalla para ajustar cantidad visible
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) setVisibleCount(4); // móvil
      else setVisibleCount(6); // tablet/desktop
    };

    updateCount(); // inicial
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return (
    <div className="md:col-span-2 flex flex-col bg-gray-100 p-5 rounded-2xl shadow-sm border border-gray-100 h-full">
      {/* Título */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-700">Muebles recientes</h3>
        <button className="text-xs text-purple-600 hover:text-purple-800 transition-colors">
          Ver todos
        </button>
      </div>

      {/* Contenedor de cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto pr-1 flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
        {furnitureList.slice(0, visibleCount).map((f, i) => (
          <FurnitureCard
            key={i}
            image={f.image}
            name={f.name}
            startDate={f.startDate}
            endDate={f.endDate}
          />
        ))}
      </div>
    </div>
  );
}
