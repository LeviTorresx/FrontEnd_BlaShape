"use client";

import { useState } from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className=" bg-white fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={"/"}>
              <Image
                src="/images/logo1CB.webp"
                alt="Logo Blashape"
                width={180}
                height={80}
                className="mx-auto"
              />
            </Link>
          </div>

          {/* Links Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="#sobre-nosotros"
              className="flex items-center gap-2 text-gray-800 font-bold hover:text-purple-700 transition-colors"
            >
              <span>Sobre nosotros</span>
            </Link>

            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-2xl shadow-2xl bg-purple-900 text-white font-medium hover:bg-purple-800 transition-colors"
            >
              <FaUser className="text-lg" />
              <span>Iniciar sesión</span>
            </Link>
          </div>

          {/* Botón hamburguesa */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700 hover:text-purple-700 focus:outline-none transition"
            >
              {open ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="px-7 pt-2 pb-8 space-y-2 bg-white shadow-md">
          <Link
            href="#sobre-nosotros"
            className="flex items-center justify-center gap-2 font-bold text-gray-800 hover:text-purple-700 transition-colors"
          >
            <span>Sobre nosotros</span>
          </Link>

          <Link
            href="/login"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-purple-900 text-white font-medium hover:bg-purple-800 transition-colors"
          >
            <FaUser className="text-lg" />
            <span>Iniciar sesión</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
