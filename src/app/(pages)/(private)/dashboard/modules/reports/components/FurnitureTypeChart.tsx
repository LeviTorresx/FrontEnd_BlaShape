"use client";

import { motion } from "framer-motion";
import { FurnitureTypeCount } from "@/app/types/Analytics";

const TYPE_LABELS: Record<string, string> = {
  COCINA: "Cocina",
  SALA: "Sala",
  NOCHERO: "Nochero",
  GABETERO: "Gabetero",
  CLOSET: "Clóset",
  BAÑO: "Baño",
  ESCRITORIO: "Escritorio",
  MESA: "Mesa",
  SILLA: "Silla",
  OTRO: "Otro",
};

const BAR_COLORS = [
  "bg-purple-600",
  "bg-violet-500",
  "bg-indigo-500",
  "bg-purple-400",
  "bg-violet-400",
  "bg-indigo-400",
  "bg-purple-300",
  "bg-violet-300",
  "bg-indigo-300",
  "bg-purple-200",
];

interface Props {
  data: FurnitureTypeCount[];
  loading?: boolean;
}

export default function FurnitureTypeChart({ data, loading }: Props) {
  const max = Math.max(...data.map((d) => d.count), 1);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1 h-6 bg-gray-100 rounded-lg animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (!data.length) {
    return (
      <p className="text-sm text-gray-400 italic text-center py-6">
        Sin datos de tipos de muebles
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((item, index) => {
        const pct = Math.round((item.count / max) * 100);
        return (
          <div key={item.furnitureType} className="flex items-center gap-3">
            <span className="w-20 text-xs text-gray-600 text-right flex-shrink-0 font-medium">
              {TYPE_LABELS[item.furnitureType] ?? item.furnitureType}
            </span>
            <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                className={`h-full rounded-full flex items-center justify-end pr-2 ${BAR_COLORS[index % BAR_COLORS.length]}`}
              >
                {pct > 15 && (
                  <span className="text-[10px] font-bold text-white">
                    {item.count}
                  </span>
                )}
              </motion.div>
            </div>
            {pct <= 15 && (
              <span className="text-xs font-semibold text-gray-700 w-6">
                {item.count}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}