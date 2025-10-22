"use client";
import { ReactNode, useState } from "react";
import FurnitureTable from "./components/FurnitureTable";
import { FaPlus, FaRegAngry, FaRegCheckCircle } from "react-icons/fa";
import {
  useAddFurnitureMutation,
  useGetFurnitureQuery,
  useUpdateFurnitureMutation,
} from "@/app/services/mockFurnituresApi";
import AppModal from "@/app/components/ui/AppModal";
import FurnitureForm from "@/app/components/forms/FurnitureForm";
import { Furniture } from "@/app/types/Furniture";
import { MdErrorOutline } from "react-icons/md";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import FurnitureCard from "./components/FurnitureCard";
import Button from "@/app/components/ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export default function FurnitureModule({
  onSelect,
}: {
  onSelect: (key: string, id?: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedFurniture, setSelectedFurniture] = useState<Furniture | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "info" as "error" | "warning" | "info" | "success",
    message: "",
    icon: <MdErrorOutline fontSize="inherit" />,
  });

  const { data: furnitures = [] } = useGetFurnitureQuery();
  const [createFurniture] = useAddFurnitureMutation();
  const [updateFurniture] = useUpdateFurnitureMutation();
  const  customers  = useSelector((state: RootState) => state.customers.list);

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const showSnackbar = (
    severity: "error" | "warning" | "info" | "success",
    message: string,
    icon: ReactNode
  ) => setSnackbar({ open: true, severity, message, icon: <MdErrorOutline /> });

  const filtered = furnitures.filter((item) =>
    Object.values(item).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleCreateFurniture = async (newFurniture: Furniture) => {
    try {
      await createFurniture(newFurniture).unwrap();
      showSnackbar(
        "success",
        "¡Mueble creado con éxito!",
        <FaRegCheckCircle />
      );
    } catch {
      showSnackbar(
        "warning",
        "Hubo un error al crear el mueble",
        <FaRegAngry />
      );
    } finally {
      resetFormState();
    }
  };

  const handleUpdateFurniture = async (updatedFurniture: Furniture) => {
    try {
      await updateFurniture(updatedFurniture).unwrap();
      showSnackbar(
        "success",
        "Mueble actualizado correctamente",
        <FaRegCheckCircle />
      );
    } catch {
      showSnackbar("error", "Error al actualizar el mueble", <FaRegAngry />);
    } finally {
      resetFormState();
    }
  };

  const resetFormState = () => {
    setOpen(false);
    setSelectedFurniture(null);
    setIsEditing(false);
  };

  const handleEditFurniture = (furniture: Furniture) => {
    setSelectedFurniture(furniture);
    setIsEditing(true);
    setOpen(true);
  };

  const handleViewFurniture = (furniture: Furniture) => {
    setSelectedFurniture(furniture);
    setOpenView(true);
  };

  const handleAddBreakdown = (furniture: Furniture) => {
    onSelect("shape", furniture.furnitureId);
  };

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-white via-gray-50 to-purple-50 rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Gestión de Muebles
          </h1>
          <p className="text-sm text-gray-500">
            Administra, crea y visualiza los muebles registrados en el taller.
          </p>
        </div>

        <Button
          label="Nuevo Mueble"
          icon={<FaPlus className="text-sm" />}
          onClick={() => setOpen(true)}
         
        />
      </div>

      {/* Tabla */}
      <div className="flex-1 min-h-0">
        <FurnitureTable
          filtered={filtered}
          search={search}
          setSearch={setSearch}
          onEdit={handleEditFurniture}
          onView={handleViewFurniture}
          onAddPieces={handleAddBreakdown}
        />
      </div>

      {/* Modal Crear / Editar */}
      <AppModal
        open={open}
        onClose={resetFormState}
        title={isEditing ? "Editar Mueble" : "Crear nuevo mueble"}
        maxWidth="md"
      >
        <FurnitureForm
          data={selectedFurniture || undefined}
          onSubmit={isEditing ? handleUpdateFurniture : handleCreateFurniture}
          customers={customers}
        />
      </AppModal>

      {/* Modal Detalles */}
      <AppModal
        open={openView}
        onClose={() => {
          setOpenView(false);
          setSelectedFurniture(null);
        }}
        title="Detalles del mueble"
      >
        {selectedFurniture && (
          <FurnitureCard
            furniture={selectedFurniture}
            customer={customers.find(
              (c) => c.customerId === selectedFurniture?.customerId
            )}
          />
        )}
      </AppModal>

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
