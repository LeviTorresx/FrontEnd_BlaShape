"use client";

import { SheetPreviewDTO } from "@/app/types/SheetPreview";

type PreviewsRendererProps = {
  previews: SheetPreviewDTO[];
};

export default function PreviewsRenderer({ previews }: PreviewsRendererProps) {
  return (
    <div className="space-y-8">
      {previews.map((preview, index) => (
        <div
          key={index}
          className="border rounded-xl shadow p-4 bg-white flex flex-col gap-4"
        >
          {/* Header info */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-purple-800">
                {preview.materialName} — Plano {preview.planeNumber}
              </p>
              <p className="text-sm text-gray-600">
                Tamaño: {preview.sheetWidth} × {preview.sheetHeight} mm
              </p>
              <p className="text-sm text-gray-600">
                Espesor: {preview.materialThickness} mm
              </p>
              <p className="text-sm text-gray-600">
                Color: {preview.colorName}{" "}
                <span
                  className="inline-block w-4 h-4 rounded-full border"
                  style={{ backgroundColor: preview.colorHex }}
                />
              </p>
              <p className="text-sm text-gray-600">
                Porcentaje usado: {preview.percentageUtilized.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600">
                Total piezas: {preview.totalPieces}
              </p>
            </div>
          </div>

          {/* SVG */}
          <div
            className="overflow-auto border rounded-lg"
            dangerouslySetInnerHTML={{ __html: preview.svgContent }}
          />
        </div>
      ))}
    </div>
  );
}
