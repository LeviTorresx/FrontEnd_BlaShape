"use client";

import Image from "next/image";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 lg:px-12 py-5 border-b border-purple-200 relative z-10 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image
          src="/images/logo2W.webp"
          alt="Blashape Logo"
          width={32}
          height={32}
        />
        <span className="font-display font-extrabold text-xl tracking-tight text-purple-900">
          Blashape
        </span>
      </div>

      {/* Links */}
      <ul className="hidden md:flex items-center gap-8 list-none text-sm text-gray-500 font-sans">
        <li className="cursor-pointer hover:text-purple-700 transition-colors">
          Producto
        </li>
        <li className="cursor-pointer hover:text-purple-700 transition-colors">
          Precios
        </li>
        <Link href="/documentation" className="cursor-pointer hover:text-purple-700 transition-colors">
          Documentación
        </Link>
      </ul>

      <Link
        href="/login"
        className="group flex items-center gap-2 bg-purple-800 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:-translate-y-0.5 transition-transform duration-200"
      >
        Ingresa
        <FiLogIn
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </Link>
    </nav>
  );
}
