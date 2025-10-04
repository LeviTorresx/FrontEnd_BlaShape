
type Props = {
    furnitureIds: number[];
};

export default function RecentFurniture( { furnitureIds }: Props ) {
  return (
    <div className="md:col-span-2 flex flex-col bg-gray-200 p-6 rounded-xl shadow-sm overflow-hidden">
      <h3 className="font-semibold text-gray-700 mb-4">Muebles recientes</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-y-auto">
        {furnitureIds.map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4 flex items-center justify-center text-gray-400 border hover:shadow transition"
          >
            Mueble #{i}
          </div>
        ))}
      </div>
    </div>
  );
}
