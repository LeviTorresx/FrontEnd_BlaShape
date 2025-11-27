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
  FaCubes,
} from "react-icons/fa";
import { formatDate } from "@/app/utils/formatDate";
import { useRouter } from "next/navigation";

interface FurnitureCardProps {
  furniture: Furniture;
  customer?: Customer;
}

export default function FurnitureCard({
  furniture,
  customer,
}: FurnitureCardProps) {
  if (!furniture) return null;

  const router = useRouter();

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
        {/* Columna 1: Información del cliente */}
        <div className="space-y-3 bg-purple-50/40 p-4 rounded-xl border border-purple-100 shadow-sm">
          <p className="flex items-center gap-2">
            <FaUser className="text-purple-600" />
            <span className="font-medium text-gray-900">Cliente:</span>
            {customer ? (
              <span>
                {customer.name} {customer.lastName}
              </span>
            ) : (
              <span className="italic text-gray-500">No asignado</span>
            )}
          </p>

          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-purple-600" />
            <span className="font-medium text-gray-900">Creación:</span>
            {formatDate(furniture.creationDate) || "—"}
          </p>

          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-purple-600" />
            <span className="font-medium text-gray-900">Entrega:</span>
            {formatDate(furniture.endDate) || "—"}
          </p>
        </div>

        {/* Columna 2: Info del mueble */}
        <div className="space-y-3 bg-purple-50/40 p-4 rounded-xl border border-purple-100 shadow-sm">
          <p className="flex items-center gap-2">
            <span className="font-medium text-gray-900">ID del mueble:</span>
            {furniture.furnitureId}
          </p>

          <p className="flex items-center gap-2">
            <span className="font-medium text-gray-900">Piezas:</span>
            {furniture.cutting?.pieces?.length
              ? furniture.cutting.pieces
                  .map((p) => Number(p.quantity))
                  .reduce((a, b) => a + b, 0)
              : 0}
          </p>

          {furniture.cutting?.pieces?.length > 0 && (
            <button
              onClick={() =>
                router.push(`/dashboard/shape/${furniture.furnitureId}`)
              }
              className="flex items-center justify-center gap-2 
                   bg-purple-600 text-white font-medium px-4 py-2 rounded-lg
                   hover:bg-purple-700 transition duration-200 shadow-sm"
            >
              <FaCubes className="text-base" />
              Ver piezas
            </button>
          )}

          {furniture.documentUrl && (
            <a
              href={furniture.documentUrl}
              target="_blank"
              className="flex items-center gap-2 text-purple-700 hover:text-purple-900 
                   transition underline font-medium"
            >
              <FaFilePdf className="text-lg" />
              Ver documento final
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
