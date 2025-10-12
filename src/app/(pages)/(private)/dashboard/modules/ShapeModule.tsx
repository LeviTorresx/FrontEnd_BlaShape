"use client";

import { useEffect } from "react";

export default function ShapeModule({
  shapeId,
}: {
  shapeId?: number | string;
}) {
  useEffect(() => {
    if (shapeId) {
      console.log("Cargando datos del corte con ID:", shapeId);
      // Aquí puedes hacer fetch a la API o mock
    }
  }, [shapeId]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Zona de cortes</h2>
      {shapeId ? (
        <p>Mostrando información del corte #{shapeId}</p>
      ) : (
        <p>Selecciona un corte para ver los detalles.</p>
      )}
    </div>
  );
}
