"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
  loading?: boolean;
  colorClass?: string; // e.g. "text-purple-600", "text-emerald-600"
  bgClass?: string;    // e.g. "bg-purple-50"
}

export default function StatCard({
  title,
  value,
  icon,
  subtitle,
  loading = false,
  colorClass = "text-purple-700",
  bgClass = "bg-purple-50",
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow duration-300"
    >
      {/* Icon container */}
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl ${bgClass} ${colorClass}`}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide truncate">
          {title}
        </p>
        {loading ? (
          <div className="mt-1 h-7 w-24 bg-gray-200 rounded-md animate-pulse" />
        ) : (
          <p className={`text-2xl font-bold tracking-tight ${colorClass}`}>
            {value}
          </p>
        )}
        {subtitle && (
          <p className="text-xs text-gray-400 mt-0.5 truncate">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}