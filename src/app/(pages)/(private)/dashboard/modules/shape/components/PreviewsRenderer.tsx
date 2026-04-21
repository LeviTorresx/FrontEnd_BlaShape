"use client";

import { useMemo, useState } from "react";
import { SheetPreviewDTO } from "@/app/types/SheetPreview";
import {
  MdChevronLeft,
  MdChevronRight,
  MdFirstPage,
  MdLastPage,
} from "react-icons/md";

type Props = {
  previews: SheetPreviewDTO[];
};

function groupPreviews(previews: SheetPreviewDTO[]) {
  const groups: Record<string, SheetPreviewDTO[]> = {};

  previews.forEach((p) => {
    const key = `${p.materialName} • ${p.materialThickness}mm • ${p.colorName}`;

    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  });

  return groups;
}

export default function PreviewsRenderer({ previews }: Props) {
  const grouped = useMemo(() => groupPreviews(previews), [previews]);
  const groupKeys = Object.keys(grouped);

  const [selectedGroup, setSelectedGroup] = useState(groupKeys[0] || "");
  const [page, setPage] = useState(0);

  const currentGroup = grouped[selectedGroup] || [];
  const current = currentGroup[page];

  if (!previews.length) return null;

  return (
    <div className="flex gap-6 h-full">
      {/*(grupos) */}
      <aside className="w-72 bg-white rounded-2xl p-4 shadow-sm flex flex-col">
        <h3 className="font-semibold text-gray-800 mb-4">Materiales</h3>

        <div className="flex flex-col gap-3 overflow-auto">
          {groupKeys.map((key) => {
            const group = grouped[key];
            const first = group[0]; // para color y material

            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedGroup(key);
                  setPage(0);
                }}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left
            ${
              selectedGroup === key
                ? "bg-purple-50 border-purple-500 shadow-sm"
                : "bg-white hover:bg-gray-50 border-gray-200"
            }`}
              >
                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-full border shadow-inner"
                    style={{ backgroundColor: first.colorHex }}
                  />
                  <div className="absolute inset-0 rounded-full bg-white/10" />
                </div>

                {/* Info */}
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-medium ${
                      selectedGroup === key
                        ? "text-purple-800"
                        : "text-gray-800"
                    }`}
                  >
                    {first.materialName}
                  </span>

                  <span className="text-xs text-gray-500">
                    {first.materialThickness}mm • {first.colorName}
                  </span>

                  <span className="text-xs text-gray-400">
                    {group.length} planos
                  </span>
                </div>

                {/* indicador activo */}
                {selectedGroup === key && (
                  <div className="ml-auto w-2 h-2 bg-purple-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Viewer */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Header técnico */}
        {current && (
          <div className="bg-white border border-purple-100 rounded-2xl px-5 py-4 shadow-sm flex flex-col gap-4">
            {/*Línea principal */}
            <div className="flex justify-between items-center">
              {/* Info izquierda */}
              <div className="flex items-center gap-4">
                {/*Color */}
                <div
                  className="w-10 h-10 rounded-full border-2 border-purple-200 shadow-inner"
                  style={{ backgroundColor: current.colorHex }}
                />

                {/*Info plano */}
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-purple-900">
                    Plano #{current.planeNumber}
                  </span>

                  <span className="text-sm text-purple-500">
                    {current.sheetWidth} × {current.sheetHeight} mm
                  </span>
                </div>
              </div>

              {/* Métricas */}
              <div className="flex items-center gap-6">
                {/* Uso */}
                <div className="flex flex-col items-end">
                  <span className="text-xs text-purple-900">Uso material</span>
                  <span
                    className={`text-sm font-semibold ${
                      current.percentageUtilized > 85
                        ? "text-purple-700"
                        : current.percentageUtilized > 60
                          ? "text-purple-500"
                          : "text-red-400"
                    }`}
                  >
                    {current.percentageUtilized.toFixed(1)}%
                  </span>
                </div>

                {/* Piezas */}
                <div className="flex flex-col items-end">
                  <span className="text-xs text-purple-900">Piezas</span>
                  <span className="text-sm font-semibold text-purple-800">
                    {current.totalPieces}
                  </span>
                </div>
              </div>
            </div>

            {/*Línea secundaria */}
            <div className="flex justify-between items-center">
              {/* Material */}
              <div className="text-sm text-purple-600">
                <span className="font-medium text-purple-800">
                  {current.materialName}
                </span>{" "}
                • {current.materialThickness}mm • {current.colorName}
              </div>

              {/*Paginación */}
              <div className="text-sm text-purple-400">
                Plano {page + 1} de {currentGroup.length}
              </div>
            </div>

            {/* Barra de uso visual */}
            <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  current.percentageUtilized > 85
                    ? "bg-purple-700"
                    : current.percentageUtilized > 60
                      ? "bg-purple-500"
                      : "bg-red-400"
                }`}
                style={{ width: `${current.percentageUtilized}%` }}
              />
            </div>
          </div>
        )}

        <div className="relative flex-1 rounded-2xl overflow-hidden">
          {/* 🔹 SVG */}
          <div className="w-full h-full flex items-center justify-center overflow-auto p-6">
            {current && (
              <div
                className="bg-white shadow-lg rounded-md"
                dangerouslySetInnerHTML={{ __html: current.svgContent }}
              />
            )}
          </div>

          {/* 🔹 NAV INFERIOR */}
          <div
            className="absolute top-0.5 left-1/2 -translate-x-1/2 z-10 
    bg-white/90 backdrop-blur-md border border-purple-200 
    shadow-md rounded-xl px-3 py-1 flex items-center gap-3"
          >
            {/* Anterior */}
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="p-2 rounded-lg text-purple-700 hover:bg-purple-100 disabled:opacity-40 transition"
            >
              <MdChevronLeft size={20} />
            </button>

            {/* Indicador */}
            <div className="flex items-center gap-2 px-2">
              <span className="text-sm font-semibold text-purple-700">
                {page + 1}
              </span>
              <span className="text-xs text-purple-400">
                / {currentGroup.length}
              </span>
            </div>

            {/* Siguiente */}
            <button
              onClick={() =>
                setPage((p) => Math.min(p + 1, currentGroup.length - 1))
              }
              disabled={page === currentGroup.length - 1}
              className="p-2 rounded-lg text-purple-700 hover:bg-purple-100 disabled:opacity-40 transition"
            >
              <MdChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
