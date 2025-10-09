"use client";
import { useState } from "react";
import FurnitureTable from "./components/FurnitureTable";
import ButtonActions from "@/app/components/ui/ButtonActions";
import { FaPlus } from "react-icons/fa";
import { useGetFurnitureQuery } from "@/app/services/mockFurnituresApi";

export default function FurnitureModule() {
  const [search, setSearch] = useState("");
  const { data: furnitures = [] } = useGetFurnitureQuery();

  const filtered = furnitures.filter((item) =>
    Object.values(item).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
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
