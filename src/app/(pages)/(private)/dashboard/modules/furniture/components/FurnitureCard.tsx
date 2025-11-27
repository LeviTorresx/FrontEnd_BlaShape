"use client";

import Image from "next/image";
import { Furniture } from "@/app/types/Furniture";
import { Customer } from "@/app/types/Customer";
import {
  FaCalendarAlt,
  FaFilePdf,
  FaImage,
  FaUser,
  FaClipboardList,
} from "react-icons/fa";
import { formatDate } from "@/app/utils/formatDate";

interface FurnitureCardProps {
  furniture: Furniture;
  customer?: Customer;
}

export default function FurnitureCard({
  furniture,
  customer,
}: FurnitureCardProps) {
  if (!furniture) return null;

  return (
    <div
      className="bg-white/80 backdrop-blur-md border border-gray-100 shadow-lg rounded-2xl p-6 
                 hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3 mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <FaClipboardList className="text-purple-500" />
          {furniture.name || "Mueble sin nombre"}
        </h2>
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            furniture.status === "FINALIZADO"
              ? "bg-green-100 text-green-700"
              : furniture.status === "EN_PROGRESO"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {furniture.status}
        </span>
      </div>

      {/* Grid principal */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Imagen inicial */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
            <FaImage className="text-purple-500" /> Imagen inicial
          </label>
          {furniture.imageInitUrl ? (
            <Image
              src={furniture.imageInitUrl}
              alt="Imagen inicial"
              width={400}
              height={250}
              className="rounded-xl border border-gray-200 shadow-sm object-cover"
            />
          ) : (
            <div className="w-full h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
              Sin imagen
            </div>
          )}
        </div>

        {/* Imagen final */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
            <FaImage className="text-purple-500" /> Imagen final
          </label>
          {furniture.imageEndUrl ? (
            <Image
              src={furniture.imageEndUrl}
              alt="Imagen final"
              width={400}
              height={250}
              className="rounded-xl border border-gray-200 shadow-sm object-cover"
            />
          ) : (
            <div className="w-full h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
              Sin imagen
            </div>
          )}
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-6 grid sm:grid-cols-2 gap-6 text-sm text-gray-700">
        <div className="space-y-2">
          <p className="flex items-center gap-2">
            <FaUser className="text-purple-500" />
            <strong>Cliente:</strong>{" "}
            {customer ? `${customer.name} ${customer.lastName}` : "No asignado"}
          </p>
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-purple-500" />
            <strong>Creación:</strong> {formatDate(furniture.endDate) || "—"}
          </p>
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-purple-500" />
            <strong>Entrega:</strong> {formatDate(furniture.endDate) || "—"}
          </p>
        </div>

        <div className="space-y-2">
          <p>
            <strong>ID del mueble:</strong> {furniture.furnitureId}
          </p>
          <p>
            <strong>Piezas:</strong>{" "}
            {furniture.cutting.pieces
              .map((p) => Number(p.quantity))
              .reduce((a, b) => a + b, 0 || 0)}
          </p>
          {furniture.documentUrl && (
            <a
              href={furniture.documentUrl}
              target="_blank"
              className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition underline"
            >
              <FaFilePdf /> Ver documento final
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
