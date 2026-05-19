"use client";

import { motion } from "framer-motion";
import { FaChartBar } from "react-icons/fa";
import CarpenterAnalytics from "./components/CarpenterAnalytics";

// Cuando el back implemente roles, importa AdminAnalytics y bifurca aquí:
// const isAdmin = user?.role === "ADMIN";
// {isAdmin ? <AdminAnalytics /> : <CarpenterAnalytics />}

export default function ReportsModule() {
  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-white via-gray-50 to-purple-50 rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col">
      {/* ── Header ────────────────────────────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
          <FaChartBar className="text-purple-600" />
          Analíticas
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Métricas y estadísticas de tu taller
        </p>
      </div>

      {/* ── Contenido ─────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex-1"
      >
        <CarpenterAnalytics />
      </motion.div>
    </div>
  );
}