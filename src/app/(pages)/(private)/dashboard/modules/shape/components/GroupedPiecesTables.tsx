"use client";

import { gruopedPieces, Piece } from "@/app/types/Piece";
import { useState } from "react";
import { FaEdit, FaTrash, FaSyncAlt, FaSave, FaTimes } from "react-icons/fa";
import {
  removePiece,
  editPiece,
  rotatePiece,
} from "@/app/store/slices/piecesSlice";
import { useAppDispatch } from "@/app/hooks/useRedux";

type Props = {
  groupedData: gruopedPieces[];
};

export default function GroupedPiecesTables({ groupedData }: Props) {
  const [editingPieceId, setEditingPieceId] = useState<number | null>(null);
  const [form, setForm] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const dispatch = useAppDispatch();

  const startEditing = (piece: Piece) => {
    if (!piece.pieceId) return;
    setEditingPieceId(piece.pieceId);
    setForm({ width: piece.width, height: piece.height });
  };

  const handleSave = (piece: Piece) => {
    if (!piece.pieceId) return;

    // Crear el piece actualizado con las nuevas dimensiones
    const updatedPiece: Piece = {
      ...piece,
      width: form.width,
      height: form.height,
    };

    dispatch(editPiece(updatedPiece));
    setEditingPieceId(null);
  };

  const handleRotate = (piece: Piece) => {
    if (!piece.pieceId) return;

    dispatch(rotatePiece(piece.pieceId));

    // Si está editando, actualiza también el formulario
    if (editingPieceId === piece.pieceId) {
      setForm({ width: piece.height, height: piece.width });
    }
  };

  const handleDelete = (pieceId: number) => {
    dispatch(removePiece(pieceId));
  };

  return (
    <div className="flex flex-col gap-6 overflow-y-auto max-h-[70vh] pr-2">
      {groupedData.map((group) => (
        <div
          key={group.key}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 shadow-sm hover:shadow-md transition-all p-5"
        >
          {/* Encabezado */}
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

          {/* Tabla */}
          <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-purple-200 text-purple-800">
                <tr>
                  <th className="p-3 text-center font-semibold">#</th>
                  <th className="p-3 text-center font-semibold">Cant.</th>
                  <th className="p-3 text-center font-semibold">Alto</th>
                  <th className="p-3 text-center font-semibold">Ancho</th>
                  <th className="p-3 text-center font-semibold">Bordes</th>
                  <th className="p-3 text-center font-semibold">Acciones</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-purple-100">
                {group.pieces.map((piece) => {
                  const isEditing = editingPieceId === piece.pieceId;

                  return (
                    <tr
                      key={piece.pieceId}
                      className="bg-white hover:bg-purple-50 transition-colors text-center"
                    >
                      {/* ID */}
                      <td className="p-3">
                        <span className="px-2 py-1 text-xs font-bold bg-purple-300 text-purple-900 rounded-lg shadow-sm">
                          ID {piece.pieceId}
                        </span>
                      </td>

                      {/* Cantidad */}
                      <td className="p-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 font-semibold rounded-full shadow-sm text-xs">
                          x{piece.quantity}
                        </span>
                      </td>

                      {/* ALTO */}
                      <td className="p-3 font-medium text-gray-800">
                        {isEditing ? (
                          <input
                            type="number"
                            value={form.height}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                height: Number(e.target.value),
                              })
                            }
                            className="w-20 px-2 py-1 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500"
                          />
                        ) : (
                          <p className="px-2 py-1 bg-gray-100 rounded-md text-gray-700">
                            {piece.height}{" "}
                            <span className="text-xs text-gray-600 font-bold">
                              mm
                            </span>
                          </p>
                        )}
                      </td>

                      {/* ANCHO */}
                      <td className="p-3 font-medium text-gray-800">
                        {isEditing ? (
                          <input
                            type="number"
                            value={form.width}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                width: Number(e.target.value),
                              })
                            }
                            className="w-20 px-2 py-1 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500"
                          />
                        ) : (
                          <p className="px-2 py-1 bg-gray-100 rounded-md text-gray-700">
                            {piece.width}{" "}
                            <span className="text-xs text-gray-600 font-bold">
                              mm
                            </span>
                          </p>
                        )}
                      </td>

                      {/* BORDES VISUALES */}
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-3">
                          {/* Cuadrado simbólico de bordes */}
                          <div className="relative w-6 h-6 border border-gray-300 rounded-sm">
                            {/* Top */}
                            {piece.edges.top && (
                              <div className="absolute top-0 left-0 w-full h-[3px] bg-purple-500 rounded-sm"></div>
                            )}
                            {/* Bottom */}
                            {piece.edges.bottom && (
                              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-purple-500 rounded-sm"></div>
                            )}
                            {/* Left */}
                            {piece.edges.left && (
                              <div className="absolute top-0 left-0 h-full w-[3px] bg-purple-500 rounded-sm"></div>
                            )}
                            {/* Right */}
                            {piece.edges.right && (
                              <div className="absolute top-0 right-0 h-full w-[3px] bg-purple-500 rounded-sm"></div>
                            )}
                          </div>

                          {/* Texto */}
                          {Object.values(piece.edges).some((e) => e) ? (
                            <div className="flex gap-1 text-xs text-purple-700">
                              <div className="flex items-center gap-1 text-gray-500 text-xs italic">
                                <span className="w-2 h-2 bg-purple-300 rounded-sm"></span>
                                Con bordes
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-gray-500 text-xs italic">
                              <span className="w-2 h-2 bg-gray-300 rounded-sm"></span>
                              Sin bordes
                            </div>
                          )}
                        </div>
                      </td>

                      {/* ACCIONES */}
                      <td className="p-3 flex items-center justify-center gap-3">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSave(piece)}
                              className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-sm"
                            >
                              <FaSave size={14} />
                            </button>
                            <button
                              onClick={() => setEditingPieceId(null)}
                              className="p-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 shadow-sm"
                            >
                              <FaTimes size={14} />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => startEditing(piece)}
                            className="p-2 bg-purple-200 text-purple-800 rounded-full hover:bg-purple-300 shadow-sm"
                          >
                            <FaEdit size={14} />
                          </button>
                        )}

                        <button
                          onClick={() => handleRotate(piece)}
                          className="p-2 bg-orange-200 text-orange-700 rounded-full hover:bg-orange-300 shadow-sm"
                        >
                          <FaSyncAlt size={14} />
                        </button>

                        <button
                          onClick={() => handleDelete(piece.pieceId!)}
                          className="p-2 bg-red-200 text-red-700 rounded-full hover:bg-red-300 shadow-sm"
                        >
                          <FaTrash size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
