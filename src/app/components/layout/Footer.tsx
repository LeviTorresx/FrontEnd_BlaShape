"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 lg:px-12 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/images/logo2W.webp" alt="Blashape Logo" width={32} height={32} />
          <span className="font-display font-bold text-sm tracking-tight text-pruple-800">
            Blashape
          </span>
        </div>

        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Blashape. Todos los derechos reservados.
        </p>

        <div className="flex items-center gap-6 text-xs text-gray-400">
          <span className="cursor-pointer hover:text-gray-700 transition-colors">Privacidad</span>
          <span className="cursor-pointer hover:text-gray-700 transition-colors">Términos</span>
          <span className="cursor-pointer hover:text-gray-700 transition-colors">Contacto</span>
        </div>
      </div>
    </footer>
  );
}