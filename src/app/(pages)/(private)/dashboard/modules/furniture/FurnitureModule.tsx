"use client";
import { useState } from "react";
import FurnitureTable from "./components/FurnitureTable";
import ButtonActions from "@/app/components/ui/ButtonActions";
import { FaPlus } from "react-icons/fa";

const furniture = [
  {
    id: "1",
    name: "Silla Clásica de Madera",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
    createdAt: "2024-09-12",
    status: "Disponible",
  },
  {
    id: "2",
    name: "Mesa Vintage de Roble",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
    createdAt: "2024-07-25",
    status: "Terminado",
  },
  {
    id: "3",
    name: "Sofá Moderno Gris",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
    createdAt: "2024-10-02",
    status: "Pendiente",
  },
  {
    id: "4",
    name: "Estantería Industrial",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
    createdAt: "2024-08-15",
    status: "Disponible",
  },
];

export default function FurnitureModule() {
  const [search, setSearch] = useState("");

  const filtered = furniture.filter((item) =>
    Object.values(item).some((v) =>
      v.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleCreate = () => {
    alert("Acción: Crear nuevo mueble (pendiente de implementar)");
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Gestión de Muebles
        </h1>

        <ButtonActions
          label="Nuevo Mueble"
          icon={<FaPlus className="text-sm" />}
          onClick={handleCreate}
        />
      </div>

      <FurnitureTable
        filtered={filtered}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
}
