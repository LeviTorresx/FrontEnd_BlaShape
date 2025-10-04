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
    <div className="md:col-span-2 flex flex-col bg-gray-200 p-6 rounded-xl shadow-sm overflow-hidden">
      <h3 className="font-semibold text-gray-700 mb-4">Muebles recientes</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-y-auto">
        {furnitureList.map((f, i) => (
          <FurnitureCard
            key={i}
            image={f.image}
            name={f.name}
            startDate={f.startDate}
            endDate={f.endDate}
          />
        ))}
      </div>
    </div>
  );
}
