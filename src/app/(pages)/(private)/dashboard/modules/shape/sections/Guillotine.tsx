import { Item } from "@/app/types/Item";
import React, { useEffect, useMemo, useState } from "react";
import { GuillotineAlgorithm } from "./GuillotineAlgorithm";
import { GuillotineAlgorithmSheft } from "./GuillotineAlgorithmSheft";

/**
 * Mejoras incluidas:
 * - Método "guillotine" (corregido)
 * - Método "shelf" (First-Fit Decreasing Height / Shelves)
 * - kerf (ancho de corte) para simular pérdida por sierra
 * - auto-escala del SVG
 * - líneas de corte / contornos y stroke por edges (si se incluye)
 * - export simple a PNG
 */

/* ---------- Types ---------- */

type Method = "guillotine" | "shelf";

interface GuillotinePackingProps {
  width: number; // ancho de la lámina en unidades (cm/mm según tu convención)
  height: number; // alto de la lámina
  items: Item[];
  method?: Method;
  relaxation?: number;
  kerf?: number; // espacio a restar entre piezas por ancho de corte (en las mismas unidades que width/height)
}

type Space = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/* ---------- Componente ---------- */
const Guillotine: React.FC<GuillotinePackingProps> = ({
  width,
  height,
  items,
  method = "guillotine",
  relaxation = 5,
  kerf = 0, // por defecto 0 (sin kerf)
}) => {
  const [sheets, setSheets] = useState<Item[][]>([]);
  const [wastes, setWastes] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);

  // Auto escala para que encaje en pantalla
  const MAX_VIEWPORT_WIDTH = 980;
  const MAX_VIEWPORT_HEIGHT = 520;
  const scale = Math.min(
    MAX_VIEWPORT_WIDTH / width,
    MAX_VIEWPORT_HEIGHT / height,
    4
  );

  // Normalize items: remove x/y if present (packing calculador las posiciones),
  // and expand quantity if user passed such field inside items (not expected here).
  const normalizedInput = useMemo(() => {
    return items.map((it, idx) => ({
      ...it,
      id: it.id ?? `item-${idx}-${Math.random().toString(36).slice(2, 8)}`,
      rotated: false,
      x: undefined,
      y: undefined,
    }));
  }, [items]);

  useEffect(() => {
    // Packing dispatcher
    if (method === "shelf") {
      const { sheets: s, wastes: w } = GuillotineAlgorithmSheft(
        width,
        height,
        normalizedInput,
        kerf
      );
      setSheets(s);
      setWastes(w);
      setPage(0);
    } else {
      const { sheets: s, wastes: w } = GuillotineAlgorithm(
        width,
        height,
        normalizedInput,
        kerf
      );
      setSheets(s);
      setWastes(w);
      setPage(0);
    }
  }, [width, height, normalizedInput, method, kerf, relaxation]);

  // Prev/next sheet
  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(sheets.length - 1, p + 1));

  // Descargar SVG como PNG (simple)
  const exportPNG = async () => {
    const svgEl = document.getElementById(
      "guillotine-svg"
    ) as SVGSVGElement | null;
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgEl);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = svgEl.clientWidth;
      canvas.height = svgEl.clientHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#d9d9d9";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = `sheet-${page + 1}.png`;
      a.click();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  if (!sheets.length) return <p>Cargando packing...</p>;

  const sheet = sheets[page];
  const waste = wastes[page];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={prev}
          disabled={page === 0}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40 text-purple-900"
        >
          ◀
        </button>
        <div className="text-sm text-gray-700 font-medium">
          Lámina {page + 1} / {sheets.length} — {width}×{height}
        </div>
        <button
          onClick={next}
          disabled={page === sheets.length - 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40  text-purple-900"
        >
          ▶
        </button>

        <div className="ml-4 px-3 py-1 rounded bg-purple-50 text-purple-800 font-semibold">
          Desperdicio: {waste}%
        </div>

        <button
          onClick={exportPNG}
          className="ml-4 px-3 py-1 bg-green-500 text-white rounded hover:opacity-90"
        >
          Exportar PNG
        </button>
      </div>

      {/* Canvas */}
      <svg
        id="guillotine-svg"
        width={Math.max(200, Math.round(width * scale))}
        height={Math.max(120, Math.round(height * scale))}
        viewBox={`0 0 ${Math.round(width * scale)} ${Math.round(
          height * scale
        )}`}
        style={{
          border: "1px solid #444",
          borderRadius: 8,
          background: "#d9d9d9",
        }}
      >
        {/* Opcional: fondo de tablero (líneas / grid ligero) */}
        <defs>
          <pattern
            id="grid"
            width={10 * scale}
            height={10 * scale}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${10 * scale} 0 L 0 0 0 ${10 * scale}`}
              fill="none"
              strokeWidth={0.6}
            />
          </pattern>
        </defs>
        <rect
          x={0}
          y={0}
          width={width * scale}
          height={height * scale}
          fill="url(#grid)"
        />

        {/* Contorno de la lámina */}
        <rect
          x={0}
          y={0}
          width={width * scale}
          height={height * scale}
          fill="none"
          stroke="#333"
          strokeWidth={2}
          rx={6}
        />

        {/* Dibuja piezas */}
        {sheet.map((it, i) => {
          const w = ((it.rotated ? it.height : it.width) - 0) * scale;
          const h = ((it.rotated ? it.width : it.height) - 0) * scale;
          const x = (it.x ?? 0) * scale;
          const y = (it.y ?? 0) * scale;

          // stroke según edges si vienen, si no, usar stroke oscuro
          const strokeColor = it.edges ? "#222" : "#111";
          const strokeWidth = it.edges ? 1.8 : 1.2;

          // build list of guide lines (opcional): rect bounds (para ver cortes)
          return (
            <g key={String(it.id ?? i)}>
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={4}
                ry={4}
                fill={it.color.hex}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />
              {/* Texto centrado - rotar si pieza es más alta que ancha */}
              <text
                x={x + w / 2}
                y={y + h / 2}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize={Math.max(
                  10,
                  Math.min(14, Math.round((12 * scale) / 2))
                )}
                fill="#000"
                style={{ pointerEvents: "none" }}
                transform={
                  it.rotated
                    ? `rotate(-90 ${x + w / 2} ${y + h / 2})`
                    : undefined
                }
              >
                {`${Math.round(it.width)}×${Math.round(it.height)}`}
              </text>

              {/* Draw tiny markers for edges if provided */}
              {it.edges && (
                <g>
                  {it.edges.top && (
                    <line
                      x1={x}
                      y1={y}
                      x2={x + w}
                      y2={y}
                      stroke="#111"
                      strokeWidth={1}
                    />
                  )}
                  {it.edges.bottom && (
                    <line
                      x1={x}
                      y1={y + h}
                      x2={x + w}
                      y2={y + h}
                      stroke="#111"
                      strokeWidth={1}
                    />
                  )}
                  {it.edges.left && (
                    <line
                      x1={x}
                      y1={y}
                      x2={x}
                      y2={y + h}
                      stroke="#111"
                      strokeWidth={1}
                    />
                  )}
                  {it.edges.right && (
                    <line
                      x1={x + w}
                      y1={y}
                      x2={x + w}
                      y2={y + h}
                      stroke="#111"
                      strokeWidth={1}
                    />
                  )}
                </g>
              )}

              {/* Outline guide (faint) */}
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                fill="none"
                stroke="#000"
                strokeOpacity={0.06}
                strokeWidth={8}
              />
            </g>
          );
        })}

        {/* Optional: Draw guillotine cut lines (approx): lines at x and y boundaries of rects */}
        <g>
          {sheet.flatMap((it) => {
            const x = (it.x ?? 0) * scale;
            const y = (it.y ?? 0) * scale;
            const w = (it.rotated ? it.height : it.width) * scale;
            const h = (it.rotated ? it.width : it.height) * scale;
            return [
              <line
                key={`vx-${it.id}`}
                x1={x}
                y1={0}
                x2={x}
                y2={height * scale}
                stroke="#000"
                strokeOpacity={0.04}
              />,
              <line
                key={`hx-${it.id}`}
                x1={0}
                y1={y}
                x2={width * scale}
                y2={y}
                stroke="#000"
                strokeOpacity={0.04}
              />,
              <line
                key={`vx2-${it.id}`}
                x1={x + w}
                y1={0}
                x2={x + w}
                y2={height * scale}
                stroke="#000"
                strokeOpacity={0.04}
              />,
              <line
                key={`hx2-${it.id}`}
                x1={0}
                y1={y + h}
                x2={width * scale}
                y2={y + h}
                stroke="#000"
                strokeOpacity={0.04}
              />,
            ];
          })}
        </g>
      </svg>
    </div>
  );
};

export default Guillotine;
