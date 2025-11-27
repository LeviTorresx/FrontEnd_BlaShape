"use client";

import Pieces from "./sections/piece/Pieces";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useGetFurnitureByIdQuery } from "@/app/services/mockFurnituresApi";
import { gruopPiecesByAttributes } from "@/app/utils/groupPieces";
import LayoutViewer from "./components/LayoutViewer";
import { expandPiecesByQuantity } from "@/app/utils/ExpandPieces";
import { piecesToItems } from "@/app/utils/PieceToItem";
import { groupItemsByColor } from "@/app/utils/GroupItemsByColor";
import Button from "@/app/components/ui/Button";
import { FaCube } from "react-icons/fa";

export default function ShapeModule({
  shapeId,
}: {
  shapeId?: number | string;
}) {
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

  const handleButtonClick = (shapeId: number | string) => {
    if (shapeId) {
      console.log("Agregar piezas al mueble existente", shapeId, pieces);
    } else {
      console.log("Crear un nuevo mueble y agregar piezas", pieces);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6 h-full rounded-2xl">
      {/* Header principal */}
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
            onClick={() => handleButtonClick(shapeId ?? "")}
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
    </div>
  );
}
