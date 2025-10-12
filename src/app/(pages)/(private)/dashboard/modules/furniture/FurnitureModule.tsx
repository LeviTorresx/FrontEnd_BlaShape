"use client";
import { useState } from "react";
import FurnitureTable from "./components/FurnitureTable";
import ButtonActions from "@/app/components/ui/ButtonActions";
import { FaPlus } from "react-icons/fa";
import { useGetFurnitureQuery } from "@/app/services/mockFurnituresApi";
import AppModal from "@/app/components/ui/AppModal";
import FurnitureForm from "@/app/components/forms/FurnitureForm";
import { Furniture } from "@/app/types/Furniture";
import { useRouter } from "next/navigation";

export default function FurnitureModule() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const { data: furnitures = [] } = useGetFurnitureQuery();

  const filtered = furnitures.filter((item) =>
    Object.values(item).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleCreateFurniture = (furniture: Furniture) => {
    alert("Acción: Crear nuevo mueble (pendiente de implementar)");
  };

  const handleUpdateFurniture = (furniture: Furniture) => {
    alert("Acción: Actualizar mueble (pendiente de implementar)");
  };

  const handleAddBreakdown = (furniture: Furniture) => {
    alert(
      "Acción: agregar despiece al mueble (pendiente de implementar) - id:" +
        furniture.furnitureId
    );
    router.push("/dashboard/shape");
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
          onClick={() => {
            setOpen(true);
          }}
        />
        <AppModal
          open={open}
          onClose={() => {
            setOpen(false);
            setSelectedFurniture(null);
            setIsEditing(false);
          }}
          title={isEditing ? "Editar Mueble" : "Crear mueble nuevo"}
          confirmText="Guardar"
          cancelText="Cancelar"
        >
          <FurnitureForm
            data={selectedFurniture || undefined}
            buttonLabel={isEditing ? "Actualizar Mueble" : "Mueble cliente"}
            onSubmit={(furniture) => {
              if (isEditing) {
                handleUpdateFurniture(furniture);
              } else {
                handleCreateFurniture(furniture);
              }
            }}
          />
        </AppModal>
      </div>

      <FurnitureTable
        filtered={filtered}
        search={search}
        setSearch={setSearch}
        onAddPieces={handleAddBreakdown}
      />
    </div>
  );
}
