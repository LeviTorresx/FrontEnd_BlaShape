import { Furniture } from "@/app/types/Furniture";
import FurnitureCard from "./FurnitureCard";



type Props = {
  furnitureList: Furniture[];
};

export default function RecentFurniture({ furnitureList }: Props) {
  const items = furnitureList.slice(0, 3);

  return (
    <section className="h-full w-full flex flex-col bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-sm border border-purple-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-purple-200/60 backdrop-blur-sm border-b border-purple-300 sticky top-0 z-10">
        <h2 className="text-base md:text-lg font-semibold text-purple-900">
          Muebles recientes
        </h2>
        {furnitureList.length > 3 && (
          <span className="text-xs font-medium text-purple-800 bg-purple-300/50 rounded-full px-2 py-0.5">
            +{furnitureList.length - 3}
          </span>
        )}
      </div>

      {/* Contenedor de cards */}
      <div
        className="
          flex-1 overflow-y-auto p-4
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
          gap-4 
          scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent
        "
      >
        {items.map((f, i) => (
          <FurnitureCard
            key={i}
            image={f.imageInitUrl}
            name={f.name}
            startDate={f.creationDate}
            endDate={f.endDate}
          />
        ))}

        {/* Placeholder cuando no hay muebles */}
        {items.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-10">
            <p className="text-sm font-medium">No hay muebles recientes</p>
          </div>
        )}
      </div>
    </section>
  );
}
