"use client";

import PiecesForm from "@/app/components/forms/PiecesForm";
import { useAppDispatch } from "@/app/hooks/useRedux";
import { useGetFurnitureByIdQuery } from "@/app/services/mockFurnituresApi";
import { addPiece } from "@/app/store/slices/piecesSlice";
import { RootState } from "@/app/store/store";
import { Piece } from "@/app/types/Piece";
import { gruopPiecesByAttributes } from "@/app/utils/groupPieces";
import { useSelector } from "react-redux";
import GroupedPiecesTables from "./components/GroupedPiecesTables";

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

  const dispatch = useAppDispatch();

  const handleOnsubmit = (piece: Piece) => {
    dispatch(addPiece(piece));
  };

  return (
    <div className="p-6 flex flex-col gap-6 h-full rounded-2xl">
      {/* Header principal */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-3">
        <h2 className="text-2xl font-bold text-gray-800">Zona de Cortes</h2>
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
      </header>

      {/* Panel principal dividido */}
      <div className="flex flex-col md:flex-row gap-4  h-full">
        {/*Columna izquierda — Formulario */}
        <section className=" flex  bg-white rounded-xl shadow-md  p-5 ">
          {/* Información del mueble */}
          {furniture && (
            <div className="mb-5">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {furniture.name}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    furniture.status === "En progreso"
                      ? "bg-yellow-100 text-yellow-700"
                      : furniture.status === "Completado"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {furniture.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                ID del mueble: <strong>{furniture.furnitureId}</strong>
              </p>

              {furniture.pieces && furniture.pieces.length > 0 ? (
                <div className="mt-3">
                  <p className="text-sm text-gray-700 font-medium mb-1">
                    Piezas existentes:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {furniture.pieces.map((piece) => (
                      <li key={piece.pieceId}>
                        Pieza # {piece.pieceId} — {piece.materialName}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No hay piezas registradas aún.
                </p>
              )}
            </div>
          )}

          {/* Formulario */}
          {materials.length > 0 ? (
            <div className="h-full">
              <PiecesForm materials={materials} onSubmit={handleOnsubmit} />
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center italic">
              No hay materiales disponibles.
            </p>
          )}
        </section>

        <section className="flex-1 bg-white rounded-xl shadow-md border border-gray-200 p-5  max-h-[85vh]">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Tabla de Piezas
          </h3>
          <GroupedPiecesTables groupedData={grouped} />
        </section>
      </div>
    </div>
  );
}
