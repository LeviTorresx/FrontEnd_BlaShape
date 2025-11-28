import { Piece } from "@/app/types/Piece";
import { FaEdit, FaTrash, FaSyncAlt, FaSave, FaTimes } from "react-icons/fa";
import React from "react";

type Props = {
  piece: Piece;
  isEditing: boolean;
  form: { width: number; height: number; quantity: number };
  setForm: React.Dispatch<
    React.SetStateAction<{ width: number; height: number; quantity: number }>
  >;
  onStartEditing: (p: Piece | null) => void;
  onSave: (p: Piece) => void;
  onRotate: (p: Piece) => void;
  onDelete: (id: number) => void;
};

function PieceRowComponent({
  piece,
  isEditing,
  form,
  setForm,
  onStartEditing,
  onSave,
  onRotate,
  onDelete,
}: Props) {
  return (
    <tr className="bg-white hover:bg-purple-50 transition-colors text-center">
      {/* ID */}
      <td className="p-3">
        <span className="px-2 py-1 text-xs font-bold bg-purple-300 text-purple-900 rounded-lg shadow-sm">
          ID {piece.pieceId}
        </span>
      </td>

      {/* Cantidad */}
      <td className="p-3">
        {isEditing ? (
          <div className="flex items-center justify-center gap-5">
            <input
              type="number"
              value={form.quantity}
              onChange={(e) =>
                setForm((f) => ({ ...f, quantity: Number(e.target.value) }))
              }
              className=" w-25 px-2 py-1 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500"
            /><span className="text-xs">u</span>
          </div> 
        ) : (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 font-semibold rounded-full shadow-sm text-xs">
            x{piece.quantity}
          </span>
        )}
      </td>

      {/* ALTO */}
      <td className="p-3 font-medium text-gray-800">
        {isEditing ? (
          <div className="flex items-center justify-center gap-4">
            <input
              type="number"
              value={form.height}
              onChange={(e) =>
                setForm((f) => ({ ...f, height: Number(e.target.value) }))
              }
              className=" w-25 px-2 py-1 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />{" "}
            <span className="text-xs">mm</span>
          </div>
        ) : (
          <p className="px-2 py-1 bg-gray-100 rounded-md text-gray-700">
            {piece.height} <span className="text-xs">mm</span>
          </p>
        )}
      </td>

      {/* ANCHO */}
      <td className="p-3 font-medium text-gray-800">
        {isEditing ? (
          <div className="flex items-center justify-center gap-4">
            <input
              type="number"
              value={form.width}
              onChange={(e) =>
                setForm((f) => ({ ...f, width: Number(e.target.value) }))
              }
              className="w-25 px-2 py-1 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
            <span className="text-xs">mm</span>
          </div>
        ) : (
          <p className="px-2 py-1 bg-gray-100 rounded-md text-gray-700">
            {piece.width} <span className="text-xs">mm</span>
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
              onClick={() => onSave(piece)}
              className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
            >
              <FaSave size={14} />
            </button>

            <button
              onClick={() => onStartEditing(null)}
              className="p-2 bg-gray-400 text-white rounded-full hover:bg-gray-500"
            >
              <FaTimes size={14} />
            </button>
          </>
        ) : (
          <button
            onClick={() => onStartEditing(piece)}
            className="p-2 bg-purple-200 text-purple-800 rounded-full hover:bg-purple-300"
          >
            <FaEdit size={14} />
          </button>
        )}

        <button
          onClick={() => onRotate(piece)}
          className="p-2 bg-orange-200 text-orange-700 rounded-full hover:bg-orange-300"
        >
          <FaSyncAlt size={14} />
        </button>

        <button
          onClick={() => onDelete(piece.pieceId!)}
          className="p-2 bg-red-200 text-red-700 rounded-full hover:bg-red-300"
        >
          <FaTrash size={14} />
        </button>
      </td>
    </tr>
  );
}

export default React.memo(PieceRowComponent);
