import { Item } from "@/app/types/Item";
import React, { useEffect, useMemo, useState, forwardRef, useImperativeHandle } from "react";
import { GuillotineAlgorithmTwoPass } from "./GuillotineAlgorithmTPss";
import { GuillotineAlgorithm } from "./GuillotineAlgorithm";
import Button from "@/app/components/ui/Button";
import { PiFilePng } from "react-icons/pi";

type Method = "guillotine" | "guillotine-Twopass";

interface GuillotinePackingProps {
  width: number;
  height: number;
  items: Item[];
  method?: Method;
  relaxation?: number;
  kerf?: number;
  onSheetsChange?: (sheets: Item[][]) => void;
}

export interface GuillotineRef {
  exportAllSheetsToPDF: () => Promise<void>;
  getSheets: () => Item[][];
  getWastes: () => string[];
}

const Guillotine = forwardRef<GuillotineRef, GuillotinePackingProps>(({
  width,
  height,
  items,
  method = "guillotine",
  relaxation = 5,
  kerf = 0,
  onSheetsChange,
}, ref) => {
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

  // Normalize items
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
    if (method === "guillotine-Twopass") {
      const { sheets: s, wastes: w } = GuillotineAlgorithmTwoPass(
        width,
        height,
        normalizedInput,
        kerf
      );
      setSheets(s);
      setWastes(w);
      setPage(0);
      onSheetsChange?.(s);
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
      onSheetsChange?.(s);
    }
  }, [width, height, normalizedInput, method, kerf, relaxation, onSheetsChange]);

  // Función para generar imagen de una lámina específica
  const generateSheetImage = async (sheetIndex: number): Promise<string> => {
    return new Promise((resolve) => {
      // Crear un SVG temporal para esta lámina específica
      const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      tempSvg.setAttribute("width", Math.round(width * scale).toString());
      tempSvg.setAttribute("height", Math.round(height * scale).toString());
      tempSvg.setAttribute("viewBox", `0 0 ${Math.round(width * scale)} ${Math.round(height * scale)}`);
      
      // Fondo
      const background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      background.setAttribute("x", "0");
      background.setAttribute("y", "0");
      background.setAttribute("width", (width * scale).toString());
      background.setAttribute("height", (height * scale).toString());
      background.setAttribute("fill", "#d9d9d9");
      tempSvg.appendChild(background);

      // Contorno de la lámina
      const border = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      border.setAttribute("x", "0");
      border.setAttribute("y", "0");
      border.setAttribute("width", (width * scale).toString());
      border.setAttribute("height", (height * scale).toString());
      border.setAttribute("fill", "none");
      border.setAttribute("stroke", "#333");
      border.setAttribute("stroke-width", "2");
      border.setAttribute("rx", "6");
      tempSvg.appendChild(border);

      // Dibujar piezas de esta lámina
      const sheet = sheets[sheetIndex];
      sheet.forEach((it, i) => {
        const w = ((it.rotated ? it.height : it.width) - 0) * scale;
        const h = ((it.rotated ? it.width : it.height) - 0) * scale;
        const x = (it.x ?? 0) * scale;
        const y = (it.y ?? 0) * scale;

        const strokeColor = it.edges ? "#222" : "#111";
        const strokeWidth = it.edges ? "1.8" : "1.2";

        // Rectángulo de la pieza
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x.toString());
        rect.setAttribute("y", y.toString());
        rect.setAttribute("width", w.toString());
        rect.setAttribute("height", h.toString());
        rect.setAttribute("rx", "4");
        rect.setAttribute("ry", "4");
        rect.setAttribute("fill", it.color.hex);
        rect.setAttribute("stroke", strokeColor);
        rect.setAttribute("stroke-width", strokeWidth);
        tempSvg.appendChild(rect);

        // Texto
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", (x + w / 2).toString());
        text.setAttribute("y", (y + h / 2).toString());
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("alignment-baseline", "middle");
        text.setAttribute("font-size", Math.max(10, Math.min(14, Math.round((12 * scale) / 2))).toString());
        text.setAttribute("fill", "#000");
        text.textContent = `${Math.round(it.width)}×${Math.round(it.height)}`;
        
        if (it.rotated) {
          text.setAttribute("transform", `rotate(-90 ${x + w / 2} ${y + h / 2})`);
        }
        
        tempSvg.appendChild(text);
      });

      // Convertir SVG a PNG
      const serializer = new XMLSerializer();
      const source = serializer.serializeToString(tempSvg);
      const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width * scale;
        canvas.height = height * scale;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#d9d9d9";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL("image/png");
        URL.revokeObjectURL(url);
        resolve(pngUrl);
      };
      
      img.src = url;
    });
  };

  // Función para exportar todas las láminas a PDF
  const exportAllSheetsToPDF = async () => {
    if (!sheets.length) return;

    // Dinámicamente importar jsPDF
    const { default: jsPDF } = await import('jspdf');
    
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    for (let i = 0; i < sheets.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      try {
        const imgData = await generateSheetImage(i);
        
        // Calcular dimensiones para que quepa en A4
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        // Mantener relación de aspecto
        const imgWidth = width * scale;
        const imgHeight = height * scale;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.9;
        
        const x = (pdfWidth - imgWidth * ratio) / 2;
        const y = (pdfHeight - imgHeight * ratio) / 2;
        
        pdf.addImage(
          imgData, 
          'PNG', 
          x,
          y,
          imgWidth * ratio,
          imgHeight * ratio
        );
        
        // Agregar información de la lámina
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`Lámina ${i + 1} de ${sheets.length} - Desperdicio: ${wastes[i] || '0%'}`, 10, 20);
        
      } catch (error) {
        console.error(`Error generando lámina ${i + 1}:`, error);
      }
    }

    pdf.save(`packing-${new Date().getTime()}.pdf`);
  };

  // Exponer métodos al padre mediante ref
  useImperativeHandle(ref, () => ({
    exportAllSheetsToPDF,
    getSheets: () => sheets,
    getWastes: () => wastes,
  }));

  // Prev/next sheet
  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(sheets.length - 1, p + 1));

  // Descargar SVG como PNG (simple)
  const exportPNG = async () => {
    const svgEl = document.getElementById("guillotine-svg") as SVGSVGElement | null;
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
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40 text-purple-900"
        >
          ▶
        </button>

        <div className="ml-4 px-3 py-1 rounded bg-purple-50 text-purple-800 font-semibold">
          Desperdicio: {waste}%
        </div>

        <Button
          onClick={exportPNG}
          className="ml-4 px-3 py-1 bg-purple-500 text-white rounded hover:opacity-90"
          label="Exportar PNG"
          icon={<PiFilePng size={20} />}
        />

        <Button
          onClick={exportAllSheetsToPDF}
          className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:opacity-90"
          label="Exportar PDF"
          icon={<PiFilePng size={20} />}
        />
      </div>

      {/* Canvas */}
      <svg
        id="guillotine-svg"
        width={Math.max(200, Math.round(width * scale))}
        height={Math.max(120, Math.round(height * scale))}
        viewBox={`0 0 ${Math.round(width * scale)} ${Math.round(height * scale)}`}
        style={{
          border: "1px solid #444",
          borderRadius: 8,
          background: "#d9d9d9",
        }}
      >
        {/* Resto del código SVG igual... */}
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

        {sheet.map((it, i) => {
          const w = ((it.rotated ? it.height : it.width) - 0) * scale;
          const h = ((it.rotated ? it.width : it.height) - 0) * scale;
          const x = (it.x ?? 0) * scale;
          const y = (it.y ?? 0) * scale;

          const strokeColor = it.edges ? "#222" : "#111";
          const strokeWidth = it.edges ? 1.8 : 1.2;

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
              <text
                x={x + w / 2}
                y={y + h / 2}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize={Math.max(10, Math.min(14, Math.round((12 * scale) / 2)))}
                fill="#000"
                style={{ pointerEvents: "none" }}
                transform={it.rotated ? `rotate(-90 ${x + w / 2} ${y + h / 2})` : undefined}
              >
                {`${Math.round(it.width)}×${Math.round(it.height)}`}
              </text>

              {it.edges && (
                <g>
                  {it.edges.top && (
                    <line x1={x} y1={y} x2={x + w} y2={y} stroke="#111" strokeWidth={1} />
                  )}
                  {it.edges.bottom && (
                    <line x1={x} y1={y + h} x2={x + w} y2={y + h} stroke="#111" strokeWidth={1} />
                  )}
                  {it.edges.left && (
                    <line x1={x} y1={y} x2={x} y2={y + h} stroke="#111" strokeWidth={1} />
                  )}
                  {it.edges.right && (
                    <line x1={x + w} y1={y} x2={x + w} y2={y + h} stroke="#111" strokeWidth={1} />
                  )}
                </g>
              )}

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

        <g>
          {sheet.flatMap((it) => {
            const x = (it.x ?? 0) * scale;
            const y = (it.y ?? 0) * scale;
            const w = (it.rotated ? it.height : it.width) * scale;
            const h = (it.rotated ? it.width : it.height) * scale;
            return [
              <line key={`vx-${it.id}`} x1={x} y1={0} x2={x} y2={height * scale} stroke="#000" strokeOpacity={0.04} />,
              <line key={`hx-${it.id}`} x1={0} y1={y} x2={width * scale} y2={y} stroke="#000" strokeOpacity={0.04} />,
              <line key={`vx2-${it.id}`} x1={x + w} y1={0} x2={x + w} y2={height * scale} stroke="#000" strokeOpacity={0.04} />,
              <line key={`hx2-${it.id}`} x1={0} y1={y + h} x2={width * scale} y2={y + h} stroke="#000" strokeOpacity={0.04} />,
            ];
          })}
        </g>
      </svg>
    </div>
  );
});

Guillotine.displayName = 'Guillotine';
export default Guillotine;