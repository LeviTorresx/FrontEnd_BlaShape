"use client";

import Pieces from "./sections/piece/Pieces";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  useAddFurnitureMutation,
  useGetFurnitureByIdQuery,
  useUpdateFurnitureMutation,
} from "@/app/services/mockFurnituresApi";
import { gruopPiecesByAttributes } from "@/app/utils/groupPieces";
import LayoutViewer from "./components/LayoutViewer";
import { expandPiecesByQuantity } from "@/app/utils/ExpandPieces";
import { piecesToItems } from "@/app/utils/PieceToItem";
import { groupItemsByColor } from "@/app/utils/GroupItemsByColor";
import Button from "@/app/components/ui/Button";
import { FaCube, FaRegAngry, FaRegCheckCircle } from "react-icons/fa";
import AppModal from "@/app/components/ui/AppModal";
import FurnitureForm from "@/app/components/forms/FurnitureForm";
import { Furniture } from "@/app/types/Furniture";
import { MdErrorOutline } from "react-icons/md";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import { useAppDispatch } from "@/app/hooks/useRedux";
import { clearPieces, setPieces } from "@/app/store/slices/piecesSlice";

export default function ShapeModule({
  shapeId,
}: {
  shapeId?: number | string;
}) {
  const [createFurniture] = useAddFurnitureMutation();
  const [updateFurniture] = useUpdateFurnitureMutation();
  const dispatch = useAppDispatch();

  const { data: furniture } = useGetFurnitureByIdQuery(Number(shapeId), {
    skip: !shapeId,
  });
  const materials = useSelector((state: RootState) => state.materials.list);
  const pieces = useSelector((state: RootState) => state.pieces.list);
  const grouped = useMemo(() => {
    return gruopPiecesByAttributes(pieces);
  }, [pieces]);

  const expandedPieces = expandPiecesByQuantity(pieces);
  const items = piecesToItems(expandedPieces);
  const groupedItems = groupItemsByColor(items);
  const [section, setSection] = useState<"pieces" | "cut">("pieces");
  const [selectedFurniture, setSelectedFurniture] = useState<Furniture | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "info" as "error" | "warning" | "info" | "success",
    message: "",
    icon: <MdErrorOutline fontSize="inherit" />,
  });
  const customers = useSelector((state: RootState) => state.customers.list);

  const showSnackbar = (
    severity: "error" | "warning" | "info" | "success",
    message: string,
    icon: ReactNode
  ) => setSnackbar({ open: true, severity, message, icon: <MdErrorOutline /> });

  // Inyectar piezas del mueble al estado global si existen
  useEffect(() => {
    if (furniture?.cutting.pieces?.length) {
      dispatch(setPieces(furniture.cutting.pieces));
    } else {
      dispatch(clearPieces());
    }
  }, [furniture, dispatch]);

  const handleButtonClick = async (furniture: Furniture | null) => {
    if (furniture) {
      try {
        const updatedFurniture: Furniture = {
          ...furniture,
          cutting: {
            ...(furniture.cutting ?? {}),
            pieces: pieces,
          },
        };

        await updateFurniture(updatedFurniture).unwrap();

        showSnackbar(
          "success",
          "Mueble actualizado correctamente",
          <FaRegCheckCircle />
        );

        // limpiar el estado global de piezas
        dispatch(clearPieces());
      } catch {
        showSnackbar("error", "Error al actualizar el mueble", <FaRegAngry />);
      } finally {
        resetFormState();
      }
      return;
    }

    // si furniture es null (modo crear)
    setIsEditing(false);
    setSelectedFurniture(null);
    setOpen(true);
  };

  const resetFormState = () => {
    setOpen(false);
    setSelectedFurniture(null);
    setIsEditing(false);
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const handleCreateFurniture = async (newFurniture: Furniture) => {
    try {
      const furnitureWithPieces: Furniture = {
        ...newFurniture,
        cutting: {
          ...(newFurniture.cutting ?? {}),
          pieces: pieces,
        },
      };

      await createFurniture(furnitureWithPieces).unwrap();

      // limpiar el estado global
      dispatch(clearPieces());

      showSnackbar(
        "success",
        "¡Mueble creado con éxito!",
        <FaRegCheckCircle />
      );
    } catch (error) {
      showSnackbar(
        "warning",
        "Hubo un error al crear el mueble",
        <FaRegAngry />
      );
    } finally {
      resetFormState();
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6 h-full rounded-2xl">
      {/* Header principal */}
      <header
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
  border-b border-gray-200 pb-4 mb-6 gap-4"
      >
        {/* Título + switch */}
        <div className="flex items-center gap-20">
          {/* Título + info del mueble */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Zona de Cortes</h2>

            {shapeId ? (
              <div className="flex gap-3">
                <p className="text-sm text-gray-600 mt-1">
                  Mueble asociado:
                  <span className="font-semibold text-purple-700">
                    {shapeId}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Nombre:
                  <span className="font-semibold text-purple-700">
                    {" "}
                    {furniture ? furniture.name : "Cargando nombre..."}
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic mt-1">
                No está asociado a ningún mueble actualmente
              </p>
            )}
          </div>

          {/* Switch al lado del título */}
          <div className="relative inline-flex bg-gray-200 rounded-full p-1 w-max shadow-inner">
            <div
              className={`absolute top-0 left-0 h-full w-1/2 bg-purple-800 
          rounded-full shadow-md transform transition-transform duration-300 ${
            section === "cut" ? "translate-x-full" : "translate-x-0"
          }`}
            />

            <button
              onClick={() => setSection("pieces")}
              className={`relative z-10 px-5 py-1 rounded-full font-medium transition-colors duration-300 ${
                section === "pieces"
                  ? "text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Piezas
            </button>

            <button
              onClick={() => setSection("cut")}
              className={`relative z-10 px-5 py-1 rounded-full font-medium transition-colors duration-300 ${
                section === "cut"
                  ? "text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Cortes
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Total de piezas */}
          <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-xl shadow-sm">
            <FaCube className="text-lg" />
            <p className="font-medium">
              Total piezas:{" "}
              <span className="font-bold">
                {pieces
                  .map((p) => Number(p.quantity))
                  .reduce((a, b) => a + b, 0)}
              </span>
            </p>
          </div>

          {/* Botón de acción */}
          <Button
            onClick={() => handleButtonClick(furniture ?? null)}
            disabled={pieces.length === 0}
            label={shapeId ? "Agregarlas al mueble" : "Agregar a un mueble"}
          />
        </div>
        {/* Botón principal a la derecha */}
      </header>

      {/* Renderizado condicional de módulos */}
      <div className="h-full">
        {section === "pieces" ? (
          <Pieces materials={materials} pieces={grouped} />
        ) : (
          <LayoutViewer groupedItems={groupedItems} />
        )}
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
          onSubmit={handleCreateFurniture}
          customers={customers}
        />
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
