"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCog } from "react-icons/fa";

export default function ModuleSkeleton() {
  const [visible, setVisible] = useState(true);

  // 🔹 Simula carga real
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 1500); // simulación de carga
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center h-[60vh] w-full"
        >
          {/* 🔹 Icono animado */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="mb-6 text-purple-600"
          >
            <FaCog size={48} />
          </motion.div>

          {/* 🔹 Texto elegante */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl font-medium text-gray-700 tracking-tight"
          >
            Cargando módulo...
          </motion.h2>

          {/* 🔹 Línea de progreso animada */}
          <div className="mt-6 w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              className="w-1/2 h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
