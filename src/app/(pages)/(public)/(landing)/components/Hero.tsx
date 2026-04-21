"use client";

import Link from "next/link";
import { FiArrowRight, FiPlay } from "react-icons/fi";

export default function Hero() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Pill tag */}
      <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 text-xs font-medium tracking-widest uppercase px-4 py-1.5 rounded-full border border-purple-100">
        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
        Optimización inteligente de cortes
      </div>
      {/* Headline */}
      <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.05] tracking-tight text-gray-900">
        Corta más.
        <br />
        <em className="not-italic text-purple-700">Desperdicia menos.</em>
        <br />
        Gana más.
      </h1>
      {/* Subheadline */}
      <p className="text-base text-gray-500 leading-relaxed max-w-sm">
        Blashape transforma la manera en que gestionas tu madera. Planes de
        corte automáticos, precisos y sin residuos innecesarios.
      </p>
      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        <Link
          href="/register"
          className="flex items-center gap-2 bg-purple-900 text-white text-sm font-medium px-6 py-3 rounded-full hover:-translate-y-0.5 transition-transform duration-200"
        >
          Comenzar ahora
          <FiArrowRight size={18} />
        </Link>

        <button className="flex items-center gap-2 text-sm text-gray-500 px-5 py-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
          <FiPlay size={16} />
          Ver cómo funciona
        </button>
      </div>
      {/* Stats strip */}
      <div className="flex gap-8 pt-6 border-t border-gray-200">
        {[
          { num: "–38%", label: "Menos desperdicio" },
          { num: "3×", label: "Más rápido" },
          { num: "+1", label: "Talleres activos" },
        ].map((s) => (
          <div key={s.label}>
            <p className="font-display font-bold text-2xl tracking-tight text-gray-900">
              {s.num}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
