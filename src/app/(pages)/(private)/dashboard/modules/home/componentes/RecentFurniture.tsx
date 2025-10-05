import FurnitureCard from "./FurnitureCard";

interface FurnitureProps {
  image: string;
  name: string;
  startDate: string;
  endDate: string;
}

type Props = {
  furnitureList: FurnitureProps[];
};

export default function RecentFurniture({ furnitureList }: Props) {
  return (
    <section className="h-full w-full flex flex-col p-4 bg-purple-100 rounded-2xl shadow-md">
      {/* Encabezado elegante */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-purple-800">
          Muebles recientes
        </h2>
        <span className="text-sm text-gray-500">
          {furnitureList.length > 3 ? "Mostrando 3 más recientes" : ""}
        </span>
      </div>

      {/* Contenedor de cards */}
      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
          gap-4 h-full overflow-y-auto 
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
        "
      >
        {furnitureList.slice(0, 3).map((f, i) => (
          <FurnitureCard
            key={i}
            image={f.image}
            name={f.name}
            startDate={f.startDate}
            endDate={f.endDate}
          />
        ))}
      </div>
    </section>
  );
}
