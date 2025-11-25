"use client";

import Pieces from "./sections/Pieces";
import Guillotine from "./sections/Guillotine"; // tu componente de guillotina
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useGetFurnitureByIdQuery } from "@/app/services/mockFurnituresApi";
import { gruopPiecesByAttributes } from "@/app/utils/groupPieces";
import LayoutViewer from "./components/LayoutViewer";
import { expandPiecesByQuantity } from "@/app/utils/ExpandPieces";
import { piecesToItems } from "@/app/utils/PieceToItem";

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
  const grouped = gruopPiecesByAttributes(pieces);
  const expandedPieces = expandPiecesByQuantity(pieces);
  const items = piecesToItems(expandedPieces);

  console.log(items);

  const [section, setSection] = useState<"pieces" | "guillotine">("pieces");

  return (
    <div className="p-6 flex flex-col gap-6 h-full rounded-2xl">
      {/* Header principal */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-3 mb-4 gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Título */}
          <h2 className="text-2xl font-bold text-gray-800">Zona de Cortes</h2>

          {/* Información del mueble */}
          {shapeId ? (
            <p className="text-sm text-gray-600">
              Mueble asociado:{" "}
              <span className="font-semibold text-purple-600">{shapeId}</span>
            </p>
          ) : (
            <p className="text-sm text-gray-500 italic">
              No está asociado a ningún mueble actualmente
            </p>
          )}
        </div>

        {/* Switch de módulos tipo píldora */}
        <div className="relative inline-flex bg-gray-200 rounded-full p-1 w-max shadow-inner">
          {/* Fondo deslizante */}
          <div
            className={`absolute top-0 left-0 h-full w-1/2 bg-purple-800 rounded-full shadow-md transform transition-transform duration-300 ${
              section === "guillotine" ? "translate-x-full" : "translate-x-0"
            }`}
          />

          {/* Botones */}
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
            onClick={() => setSection("guillotine")}
            className={`relative z-10 px-5 py-1 rounded-full font-medium transition-colors duration-300 ${
              section === "guillotine"
                ? "text-white"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Guillotina
          </button>
        </div>
      </header>

      {/* Renderizado condicional de módulos */}
      <div className="h-full">
        {section === "pieces" ? (
          <Pieces materials={materials} pieces={grouped} />
        ) : (
          <LayoutViewer itemsProps={items} />
        )}
      </div>
    </div>
  );
}
