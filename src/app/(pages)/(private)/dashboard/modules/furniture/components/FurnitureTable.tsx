import SearchBar from "@/app/components/tables/SearchBar";
import TableContainer from "@/app/components/tables/TableContainer";
import Image from "next/image";

interface Furniture {
  id: string;
  name: string;
  image: string;
  createdAt: string;
  status: string;
}

type Props = {
  search: string;
  setSearch: (value: string) => void;
  filtered: Furniture[];
};

export default function FurnitureTable({ search, setSearch, filtered }: Props) {
  return (
    <TableContainer title="Muebles">
      {/* 🔍 Barra de búsqueda */}
      <div className="mb-3 flex justify-end">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar mueble..."
        />
      </div>

      {/* 🖥️ Vista escritorio */}
      <div className="hidden md:block overflow-y-auto rounded-lg border border-gray-100">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-purple-100 text-gray-800">
            <tr>
              <th className="p-3 text-left">Imagen</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Fecha de creación</th>
              <th className="p-3 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((f) => (
                <tr
                  key={f.id}
                  className="border-b border-gray-100 hover:bg-purple-50 transition-all"
                >
                  <td className="p-3">
                    <Image
                      src={f.image}
                      alt={f.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-lg object-cover border border-gray-200 shadow-sm"
                    />
                  </td>
                  <td className="p-3 font-medium text-gray-800">{f.name}</td>
                  <td className="p-3 text-gray-600">{f.createdAt}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        f.status === "Disponible"
                          ? "bg-green-100 text-green-700"
                          : f.status === "Terminado"
                          ? "bg-gray-200 text-gray-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-gray-500 py-6 italic"
                >
                  No se encontraron resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📱 Vista móvil (Cards personalizadas) */}
      <div className="block md:hidden space-y-3">
        {filtered.length > 0 ? (
          filtered.map((f) => (
            <div
              key={f.id}
              className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 
                         border border-purple-200 rounded-2xl shadow-sm 
                         hover:shadow-md transition-all duration-300"
            >
              {/* Imagen */}
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={f.image}
                  alt={f.name}
                    width={80}
                    height={80}
                  className="w-20 h-20 rounded-xl object-cover border border-gray-200 shadow-sm"
                />
                <div>
                  <p className="font-semibold text-purple-900 text-base">
                    {f.name}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{f.createdAt}</p>
                </div>
              </div>

              {/* Estado */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 font-medium">
                  Estado:
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    f.status === "Disponible"
                      ? "bg-green-100 text-green-700"
                      : f.status === "Terminado"
                      ? "bg-gray-200 text-gray-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {f.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6 italic">
            No se encontraron resultados
          </p>
        )}
      </div>
    </TableContainer>
  );
}
