"use client";
import { useState } from "react";
import FurnitureTable from "./components/FurnitureTable";
import ButtonActions from "@/app/components/ui/ButtonActions";
import { FaPlus, FaRegAngry, FaRegCheckCircle } from "react-icons/fa";
import {
  useAddFurnitureMutation,
  useGetFurnitureQuery,
} from "@/app/services/mockFurnituresApi";
import AppModal from "@/app/components/ui/AppModal";
import FurnitureForm from "@/app/components/forms/FurnitureForm";
import { Furniture } from "@/app/types/Furniture";
import { useGetCustomersQuery } from "@/app/services/mockCustomersApi";
import { MdErrorOutline } from "react-icons/md";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";

export default function FurnitureModule({
  onSelect,
}: {
  onSelect: (key: string, id?: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "info" as "error" | "warning" | "info" | "success",
    message: "",
    icon: <MdErrorOutline fontSize="inherit" />,
  });
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data: furnitures = [] } = useGetFurnitureQuery();
  const [createFurniture] = useAddFurnitureMutation();
  const { data: customers = [] } = useGetCustomersQuery();

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const filtered = furnitures.filter((item) =>
    Object.values(item).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleCreateFurniture = async (newFurniture: Furniture) => {
    try {
      await createFurniture(newFurniture).unwrap();
      setSnackbar({
        open: true,
        severity: "success",
        message: "¡Cliente creado con exito!",
        icon: <FaRegCheckCircle fontSize="inherit" />,
      });
    } catch (err) {
      console.error("Error al agregar cliente:", err);
      setSnackbar({
        open: true,
        severity: "warning",
        message: "¡Hubo un error al crear al cliente!",
        icon: <FaRegAngry fontSize="inherit" />,
      });
    } finally {
      setOpen(false);
    }
  };

  const handleUpdateFurniture = (furniture: Furniture) => {
    alert("Acción: Actualizar mueble (pendiente de implementar)");
  };

  const handleAddBreakdown = (furniture: Furniture) => {
    alert(
      "Acción: agregar despiece al mueble (pendiente de implementar) - id:" +
        furniture.furnitureId
    );
    onSelect("shape", furniture.furnitureId);
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
            onSubmit={(furniture) => {
              if (isEditing) {
                handleUpdateFurniture(furniture);
              } else {
                handleCreateFurniture(furniture);
              }
            }}
            customers={customers}
          />
        </AppModal>
      </div>

      <FurnitureTable
        filtered={filtered}
        search={search}
        setSearch={setSearch}
        onAddPieces={handleAddBreakdown}
      />
      {/* Snackbar */}
      <NotificationSnackbar
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
        icon={snackbar.icon}
        message={snackbar.message}
      />
    </div>
  );
}
