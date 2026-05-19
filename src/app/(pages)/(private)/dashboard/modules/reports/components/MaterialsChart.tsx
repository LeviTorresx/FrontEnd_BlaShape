"use client";

import { motion } from "framer-motion";
import { MostUsedMaterial } from "@/app/types/Analytics";

const COLORS = [
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-emerald-400",
  "bg-teal-400",
];

interface Props {
  data: MostUsedMaterial[];
  loading?: boolean;
}

export default function MaterialsChart({ data, loading }: Props) {
  const max = Math.max(...data.map((d) => d.count), 1);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1 h-6 bg-gray-100 rounded-lg animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (!data.length) {
    return (
      <p className="text-sm text-gray-400 italic text-center py-6">
        Sin materiales registrados
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((item, index) => {
        const pct = Math.round((item.count / max) * 100);
        return (
          <div key={item.material} className="flex items-center gap-3">
            <span className="w-24 text-xs text-gray-600 text-right flex-shrink-0 font-medium truncate">
              {item.material}
            </span>
            <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6, delay: index * 0.07, ease: "easeOut" }}
                className={`h-full rounded-full flex items-center justify-end pr-2 ${COLORS[index % COLORS.length]}`}
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