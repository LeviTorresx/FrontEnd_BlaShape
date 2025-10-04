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
    <div
      className="
      group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 
      overflow-hidden transition-all duration-300 transform hover:-translate-y-1 
      flex flex-row md:flex-col
    "
    >
      {/* Imagen */}
      <div
        className="
          relative w-2/5 h-20 md:w-full aspect-square md:aspect-[4/3] 
          overflow-hidden 
        "
      >
        <Image
          src={image}
          alt={name}
          fill
          className="
            object-cover transition-transform duration-500 group-hover:scale-105
            rounded-l-2xl md:rounded-none
          "
        />

        {/* Overlay degradado (solo en escritorio) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:block hidden" />

        {/* Nombre sobre la imagen (solo en escritorio) */}
        <h3 className="absolute bottom-3 left-3 text-white font-semibold text-lg drop-shadow-md hidden md:block">
          {name}
        </h3>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        {/* Nombre (visible solo en móvil) */}
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 md:hidden">
          {name}
        </h3>

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
        <div className="mt-3 sm:mt-4 h-1 w-full bg-gradient-to-r from-purple-900 to-purple-400 rounded-full group-hover:from-purple-400 group-hover:to-purple-900 transition-colors duration-300" />
      </div>
    </div>
  );
}
