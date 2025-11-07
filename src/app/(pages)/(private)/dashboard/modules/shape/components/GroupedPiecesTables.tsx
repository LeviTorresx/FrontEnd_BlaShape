import { gruopedPieces } from "@/app/types/Piece";
import { div } from "framer-motion/client";

type Props = {
  groupedData: gruopedPieces[];
};

export default function GroupedPiecesTables({ groupedData }: Props) {
  if (!groupedData || groupedData.length === 0) {
    return (
      <div className="text-center text-gray-500 italic py-6">
        No hay piezas para mostrar.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 overflow-y-auto max-h-[70vh] pr-2">
      {groupedData.map((group) => (
        <div
          key={group.key}
          className="bg-gradient-to-br from-purple-50 to-purple-100 
                     rounded-2xl border border-purple-200 
                     shadow-sm hover:shadow-md transition-all duration-300 p-5"
        >
          {/* Encabezado del grupo */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-purple-900">
                {group.materialname}
              </h3>
              <p className="text-sm text-gray-700 flex items-center">
                <span
                  className="inline-block w-4 h-4 rounded-full mr-2 border border-gray-400 shadow-sm"
                  style={{ backgroundColor: group.ColorHex }}
                />
                {group.colorName} — {group.thickness}mm
              </p>
            </div>
            <span className="px-3 py-1 text-sm font-semibold bg-purple-200 text-purple-800 rounded-full">
              {group.pieces.length} pieza{group.pieces.length > 1 ? "s" : ""}
            </span>
          </div>

          {/* Tabla de piezas */}
          <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-purple-200 text-purple-800">
                <tr>
                  <th className="p-3 text-left font-semibold">#</th>
                  <th className="p-3 text-left font-semibold">Cantidad</th>
                  <th className="p-3 text-left font-semibold">Ancho</th>
                  <th className="p-3 text-left font-semibold">Alto</th>
                  <th className="p-3 text-left font-semibold">Bordes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                {group.pieces.map((piece) => (
                  <tr
                    key={piece.pieceId}
                    className="bg-white hover:bg-purple-50 transition-colors duration-200"
                  >
                    <td className="p-3 text-gray-700 font-medium">
                      {piece.pieceId}
                    </td>
                    <td className="p-3">{piece.quantity}</td>
                    <td className="p-3">{piece.width}</td>
                    <td className="p-3">{piece.height}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2 text-xs">
                        {Object.entries(piece.edges).map(([edge, active]) =>
                          active ? (
                            <span
                              key={edge}
                              className="px-2 py-1 bg-purple-100 text-purple-700 
                                         border border-purple-200 rounded-full font-medium"
                            >
                              {edge}
                            </span>
                          ) : null
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
