"use client";

import { ReactNode } from "react";
import { FiTrendingUp, FiClock, FiTrash2, FiGrid } from "react-icons/fi";

interface Feature {
  num: string;
  title: string;
  description: string;
  icon: ReactNode;
}



const features: Feature[] = [
  {
    num: "01",
    title: "Cortes optimizados automáticamente",
    description:
      "El algoritmo encuentra la distribución más eficiente en segundos, sin esfuerzo manual.",
    icon: <FiTrendingUp size={20} />,
  },
  {
    num: "02",
    title: "Ahorra tiempo y costos",
    description:
      "Reduce horas de planificación manual y compra exactamente lo que necesitas.",
    icon: <FiClock size={20} />,
  },
  {
    num: "03",
    title: "Reducción de desperdicios",
    description:
      "Hasta un 38% menos de madera perdida por proyecto con cada plan generado.",
    icon: <FiTrash2 size={20} />,
  },
  {
    num: "04",
    title: "Historial de todos tus cortes",
    description:
      "Accede a proyectos anteriores y reutiliza configuraciones exitosas con un clic.",
    icon: <FiGrid size={20} />,
  },
];

export default function Features() {
  return (
    <section className="px-6 lg:px-12 py-20 border-t border-purple-200 bg-white">
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight text-gray-900 leading-tight">
          Todo lo que necesitas,<br />nada que sobre.
        </h2>
        <p className="hidden md:block text-sm text-purple-500 text-right max-w-[220px] leading-relaxed">
          Diseñado para talleres que quieren crecer sin complicarse.
        </p>
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden border border-purple-200"
        style={{ gap: "1px", background: "#e5e7eb" }}
      >
        {features.map((f) => (
          <div
            key={f.num}
            className="bg-white p-8 group hover:bg-purple-50 transition-colors duration-200 flex flex-col"
          >
            <span className="font-display text-xs font-bold tracking-widest text-purple-200 mb-6">
              {f.num}
            </span>

            <div className="w-10 h-10 rounded-xl border border-purple-200 bg-purple-50 flex items-center justify-center mb-5 text-purple-900 group-hover:border-purple-300 transition-colors">
              {f.icon}
            </div>

            <h3 className="font-display font-semibold text-[0.95rem] leading-snug tracking-tight text-gray-900 mb-2">
              {f.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}