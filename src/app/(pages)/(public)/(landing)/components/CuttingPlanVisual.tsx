"use client";

const pieces = [
  {
    x: 8,
    y: 8,
    w: 140,
    h: 90,
    label: "A — 140×90",
    fill: "#4c1d95",
    textFill: "white",
    opacity: 0.85,
  }, // purple-900
  {
    x: 156,
    y: 8,
    w: 100,
    h: 90,
    label: "B — 100×90",
    fill: "#5b21b6",
    textFill: "white",
    opacity: 0.9,
  }, // purple-800
  {
    x: 264,
    y: 8,
    w: 108,
    h: 40,
    label: "C — 108×40",
    fill: "#6d28d9",
    textFill: "white",
    opacity: 0.7,
  }, // purple-700
  {
    x: 264,
    y: 56,
    w: 108,
    h: 42,
    label: "D — 108×42",
    fill: "#7c3aed",
    textFill: "white",
    opacity: 0.85,
  }, // purple-600
  {
    x: 8,
    y: 106,
    w: 90,
    h: 106,
    label: "E — 90×106",
    fill: "#8b5cf6",
    textFill: "white",
    opacity: 0.85,
  }, // purple-500
  {
    x: 106,
    y: 106,
    w: 140,
    h: 50,
    label: "F — 140×50",
    fill: "#a78bfa",
    textFill: "#1e1b4b",
    opacity: 0.9,
  }, // purple-400
  {
    x: 106,
    y: 164,
    w: 65,
    h: 48,
    label: "G — 65×48",
    fill: "#c4b5fd",
    textFill: "#1e1b4b",
    opacity: 0.75,
  }, // purple-300
  {
    x: 254,
    y: 106,
    w: 118,
    h: 106,
    label: "H — 118×106",
    fill: "#ddd6fe",
    textFill: "#1e1b4b",
    opacity: 0.9,
  }, // purple-200
];

const stats = [
  { val: "95.2%", label: "Aprovechamiento" },
  { val: "8 pzas", label: "Piezas cortadas" },
  { val: "1 tabla", label: "Tabla usada" },
];

export default function CuttingPlanVisual() {
  return (
    <div className="relative flex flex-col w-full max-w-[680px] animate-fade-in-up animation-delay-150">
      {/* Label row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[0.65rem] uppercase tracking-widest text-gray-400 font-medium">
          Plan de corte generado
        </span>
        <span className="text-[0.65rem] bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full font-medium border border-purple-100">
          Optimizado ✓
        </span>
      </div>

      {/* SVG board */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <svg
          viewBox="0 0 380 220"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
        >
          {/* Board background */}
          <rect x="0" y="0" width="380" height="220" rx="6" fill="#f8f7f4" />

          {/* Pieces */}
          {pieces.map((p) => (
            <g key={p.label}>
              <rect
                x={p.x}
                y={p.y}
                width={p.w}
                height={p.h}
                rx="3"
                fill={p.fill}
                opacity={p.opacity}
              />
              <text
                x={p.x + p.w / 2}
                y={p.y + p.h / 2 + 4}
                textAnchor="middle"
                fontFamily="DM Sans, sans-serif"
                fontSize={p.w < 70 ? "9" : "10"}
                fill={p.textFill}
                fontWeight="500"
              >
                {p.label}
              </text>
            </g>
          ))}

          {/* Waste area */}
          <rect
            x="179"
            y="164"
            width="67"
            height="48"
            rx="3"
            fill="#e0ddd6"
            opacity="0.7"
          />
          <text
            x="212"
            y="186"
            textAnchor="middle"
            fontFamily="DM Sans, sans-serif"
            fontSize="9"
            fill="#8a8880"
          >
            Restante
          </text>
          <text
            x="212"
            y="199"
            textAnchor="middle"
            fontFamily="DM Sans, sans-serif"
            fontSize="8"
            fill="#8a8880"
          >
            4.8%
          </text>

          {/* Grid lines */}
          <line
            x1="150"
            y1="8"
            x2="150"
            y2="212"
            stroke="#e0ddd6"
            strokeWidth="0.5"
          />
          <line
            x1="8"
            y1="100"
            x2="372"
            y2="100"
            stroke="#e0ddd6"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Mini stat cards */}
      <div className="grid grid-cols-3 gap-3 mt-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white border border-gray-200 rounded-xl p-3 text-center"
          >
            <p className="font-display font-bold text-lg tracking-tight text-gray-900 leading-none">
              {s.val}
            </p>
            <p className="text-[0.6rem] text-gray-400 mt-1 uppercase tracking-widest">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
