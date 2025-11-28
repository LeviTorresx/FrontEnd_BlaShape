"use client";

import { gruopedPieces, Piece } from "@/app/types/Piece";
import { useState } from "react";
import { useAppDispatch } from "@/app/hooks/useRedux";
import {
  removePiece,
  editPiece,
  rotatePiece,
} from "@/app/store/slices/piecesSlice";
import PieceRowComponet from "./PieceRowComponet";

type Props = {
  groupedData: gruopedPieces[];
};

export default function GroupedPiecesTables({ groupedData }: Props) {
  const [editingPiece, setEditingPiece] = useState<Piece | null>(null);
  const [form, setForm] = useState<{ width: number; height: number; quantity:number }>({
    width: 0,
    height: 0,
    quantity: 1,
  });

  const dispatch = useAppDispatch();

  const startEditing = (piece: Piece | null) => {
    setEditingPiece(piece);
    if (piece) {
      setForm({
        width: piece.width,
        height: piece.height,
        quantity: piece.quantity,
      });
    }
  };

  const handleSave = (piece: Piece) => {
    if (!piece.pieceId) return;

    dispatch(
      editPiece({
        ...piece,
        width: form.width,
        height: form.height,
        quantity: form.quantity,
      })
    );

    setEditingPiece(null);
  };

  const handleRotate = (piece: Piece) => {
    if (!piece.pieceId) return;

    dispatch(rotatePiece(piece.pieceId));

    // actualizar form si esta editando
    if (editingPiece?.pieceId === piece.pieceId) {
      setForm({ width: piece.height, height: piece.width, quantity: piece.quantity });
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
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 shadow-sm p-5"
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
              {group.pieces.length} pieza(s)
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
                {group.pieces.map((piece) => (
                  <PieceRowComponet
                    key={piece.pieceId}
                    piece={piece}
                    isEditing={editingPiece?.pieceId === piece.pieceId}
                    form={form}
                    setForm={setForm}
                    onStartEditing={startEditing}
                    onSave={handleSave}
                    onRotate={handleRotate}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
