import Image from "next/image";

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
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      {/* Imagen (70%) */}
      <div className="relative flex-[0.7] w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay degradado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Nombre sobre la imagen */}
        <h3 className="absolute bottom-3 left-3 text-white font-semibold text-lg drop-shadow-md">
          {name}
        </h3>
      </div>

      {/* Contenido (30%) */}
      <div className="flex-[0.3] p-3 sm:p-4">
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
          <p className="flex flex-col">
            <span className="text-gray-400 font-medium">Inicio</span>
            <span className="text-gray-800 font-semibold">{startDate}</span>
          </p>
          <p className="flex flex-col text-right">
            <span className="text-gray-400 font-medium">Fin</span>
            <span className="text-gray-800 font-semibold">{endDate}</span>
          </p>
        </div>

        {/* Línea decorativa */}
        <div className="mt-3 sm:mt-4 h-1 w-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full group-hover:from-pink-500 group-hover:to-purple-400 transition-colors duration-300" />
      </div>
    </div>
  );
}
