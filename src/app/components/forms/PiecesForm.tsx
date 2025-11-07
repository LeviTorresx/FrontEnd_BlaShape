"use client";

import { useState } from "react";
import { FaCubes, FaRulerCombined } from "react-icons/fa";
import { Material } from "@/app/types/Material";
import { Piece } from "@/app/types/Piece";
import Button from "../ui/Button";

type PiecesFormProps = {
  materials: Material[];
  onSubmit: (piece: Piece) => void;
  buttonLabel?: string;
};

export default function PiecesForm({
  materials,
  onSubmit,
  buttonLabel = "Agregar Pieza",
}: PiecesFormProps) {
  const [piece, setPiece] = useState<Piece>({
    ColorHex: materials[0]?.colors[0]?.hex || "",
    colorName: materials[0]?.colors[0]?.name || "",
    thickness: materials[0]?.sizes[0]?.thickness || 0,
    materialName: materials[0]?.name || "",
    height: 0,
    width: 0,
    quantity: 1,
    edges: { top: false, bottom: false, left: false, right: false },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPiece((prev) => ({ ...prev, [name]: value }));
  };

  const handleMaterialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = materials.find((m) => m.name === e.target.value);
    if (!selected) return;

    setPiece({
      ...piece,
      materialName: selected.name,
      thickness: selected.sizes[0]?.thickness || 0,
      ColorHex: selected.colors[0]?.hex || "",
      colorName: selected.colors[0]?.name || "",
    });
  };

  const handleThicknessChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setPiece((prev) => ({ ...prev, thickness: Number(e.target.value) }));

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = materials.find((m) => m.name === piece.materialName);
    const color = selected?.colors.find((c) => c.hex === e.target.value);
    if (!color) return;
    setPiece((prev) => ({
      ...prev,
      ColorHex: color.hex,
      colorName: color.name,
    }));
  };

  const toggleEdge = (edge: keyof Piece["edges"]) =>
    setPiece((prev) => ({
      ...prev,
      edges: { ...prev.edges, [edge]: !prev.edges[edge] },
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(piece);
    setPiece({
      ...piece,
      height: 0,
      width: 0,
      quantity: 1,
      edges: { top: false, bottom: false, left: false, right: false },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl h-full bg-gradient-to-br from-purple-50 to-purple-100 
                 border border-purple-200 rounded-2xl shadow-md p-6 md:p-8 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <FaCubes className="text-purple-700 text-lg" />
          <h2 className="text-xl font-semibold text-purple-900">
            Agregar piezas
          </h2>
        </div>
        <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
          Configurar pieza
        </span>
      </div>

      {/* Material y Espesor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Material
          </label>
          <select
            name="materialName"
            value={piece.materialName}
            onChange={handleMaterialChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 
                       focus:ring-purple-400 focus:border-purple-400 outline-none bg-white"
          >
            {materials.map((m) => (
              <option key={m.materialId} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Color
          </label>
          <div className="flex items-center gap-3">
            <select
              name="ColorHex"
              value={piece.ColorHex}
              onChange={handleColorChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-purple-400 focus:border-purple-400 outline-none bg-white"
            >
              {materials
                .find((m) => m.name === piece.materialName)
                ?.colors.map((c) => (
                  <option key={c.hex} value={c.hex}>
                    {c.name}
                  </option>
                ))}
            </select>
            <div
              className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
              style={{ backgroundColor: piece.ColorHex }}
            />
          </div>
        </div>
      </div>

      {/* Color y Cantidad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Espesor (mm)
          </label>
          <select
            name="thickness"
            value={piece.thickness}
            onChange={handleThicknessChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 
                       focus:ring-purple-400 focus:border-purple-400 outline-none bg-white"
          >
            {materials
              .find((m) => m.name === piece.materialName)
              ?.sizes.map((s) => (
                <option key={s.thickness} value={s.thickness}>
                  {s.thickness}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Cantidad
          </label>
          <input
            type="number"
            name="quantity"
            min={1}
            value={piece.quantity}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 
                       focus:ring-purple-400 focus:border-purple-400 outline-none"
          />
        </div>
      </div>

      {/* Medidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FaRulerCombined className="text-purple-600" />
            Alto (cm)
          </label>
          <input
            type="number"
            name="height"
            min={0}
            value={piece.height}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 
                       focus:ring-purple-400 focus:border-purple-400 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Ancho (cm)
          </label>
          <input
            type="number"
            name="width"
            min={0}
            value={piece.width}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 
                       focus:ring-purple-400 focus:border-purple-400 outline-none"
          />
        </div>
      </div>

      {/* Bordes */}
      <div className="flex flex-col items-center gap-3 pt-3">
        <label className="font-semibold text-gray-700 text-sm">Bordes</label>
        <div className="relative w-28 h-28 border-2 border-gray-400 rounded-lg bg-gray-50 shadow-inner">
          {(["top", "right", "bottom", "left"] as (keyof Piece["edges"])[]).map(
            (edge) => (
              <div
                key={edge}
                onClick={() => toggleEdge(edge)}
                className={`absolute cursor-pointer transition-all duration-200 ${
                  piece.edges[edge]
                    ? "bg-purple-500 scale-105 z-10"
                    : "bg-gray-300 hover:bg-purple-300"
                } ${
                  edge === "top"
                    ? "top-0 left-0 w-full h-3 rounded-t-lg"
                    : edge === "bottom"
                    ? "bottom-0 left-0 w-full h-3 rounded-b-lg"
                    : edge === "left"
                    ? "top-0 left-0 w-3 h-full rounded-l-lg"
                    : "top-0 right-0 w-3 h-full rounded-r-lg"
                }`}
              />
            )
          )}
        </div>
      </div>

      {/* Botones */}
      <div className="pt-5 flex flex-col-reverse  gap-3">
        <Button
          label={buttonLabel}
          type="submit"
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white font-medium"
        />
      </div>
    </form>
  );
}
