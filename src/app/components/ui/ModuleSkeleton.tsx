"use client";

import { useState, useEffect } from "react";

export default function ModuleSkeleton() {
  const [visible, setVisible] = useState(false);

  // Simula animación de entrada
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`transition-all duration-500 ease-in-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Header */}
      <div className="space-y-3 mb-6">
        <div className="h-6 w-1/3 bg-gray-300 rounded-lg animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-gray-100 p-4 space-y-3 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-32 w-full bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Footer simulado */}
      <div className="mt-8 space-y-2">
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-1/3 bg-gray-300 rounded animate-pulse" />
      </div>
    </div>
  );
}
