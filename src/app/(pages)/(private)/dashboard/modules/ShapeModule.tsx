"use client";

import { useGetFurnitureByIdQuery } from "@/app/services/mockFurnituresApi";

export default function ShapeModule({
  shapeId,
}: {
  shapeId?: number | string;
}) {
  // 🔹 Solo ejecuta la consulta si existe shapeId
  const {
    data: furniture,
    isLoading,
    error,
  } = useGetFurnitureByIdQuery(Number(shapeId), {
    skip: !shapeId, // evita hacer la consulta si shapeId es undefined
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Zona de cortes</h2>

      {!shapeId && (
        <p className="text-gray-500">
          Selecciona un mueble para ver los detalles del corte.
        </p>
      )}

      {isLoading && <p>Cargando datos del mueble...</p>}

      {error ? (
        <p className="text-red-600">
          No se pudo cargar la información del mueble.
        </p>
      ) : null}

      {furniture && (
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">{furniture.name}</h3>
          <p className="text-sm text-gray-600">
            ID del mueble: {furniture.furnitureId}
          </p>
          <p className="mt-2 text-gray-700">
            Estado actual: <strong>{furniture.status}</strong>
          </p>

          {/* Aquí podrías mostrar la lista de piezas (furniture.pieces) */}
          {furniture.pieces && furniture.pieces.length > 0 && (
            <ul className="mt-3 list-disc list-inside text-sm text-gray-700">
              {furniture.pieces.map((piece) => (
                <li key={piece.pieceId}>{piece.pieceId}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
