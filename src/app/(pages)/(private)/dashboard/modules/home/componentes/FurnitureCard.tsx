import { formatDate } from "@/app/utils/formatDate";
import Image from "next/image";
import { FaCalendarAlt, FaCalendarCheck } from "react-icons/fa";

export default function FurnitureCard({
  image,
  name,
  startDate,
  endDate,
}: {
  image: string;
  name: string;
  startDate: string;
  endDate: string;
}) {
  return (
    <div
      className="
        group relative bg-white/80 backdrop-blur-sm 
        border border-gray-200 rounded-2xl overflow-hidden 
        shadow-sm hover:shadow-md transition-all duration-300 
        hover:-translate-y-1 flex flex-col
      "
    >
      {/* Imagen */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        {/* Nombre */}
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors truncate">
          {name}
        </h3>
        <div className="mt-3 sm:mt-2 h-1 w-full bg-gradient-to-r from-purple-900 to-purple-400 rounded-full group-hover:from-purple-400 group-hover:to-purple-900 transition-colors duration-300" />

        {/* Fechas */}
        <div className="mt-4 text-sm text-gray-600 space-y-1 flex gap-x-2 justify-between">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="w-4 h-4 text-purple-700" />
            <span>{formatDate(startDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarCheck className="w-4 h-4 text-purple-500" />
            <span>{formatDate(endDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
