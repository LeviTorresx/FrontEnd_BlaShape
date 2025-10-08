import SearchBar from "@/app/components/tables/SearchBar";
import TableContainer from "@/app/components/tables/TableContainer";

interface Client {
  id: string;
  name: string;
  phone: string;
  address: string;
  dni: string;
}

type Props = {
  search: string;
  setSearch: (value: string) => void;
  filtered: Client[];
};

export default function ClientsTable({ search, setSearch, filtered }: Props) {
  return (
    <TableContainer title="Clientes registrados">
      {/* 🔍 Barra de búsqueda */}
      <div className="mb-5 flex justify-end">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar cliente..."
        />
      </div>

      {/* 🖥️ Vista de escritorio */}
      <div className="hidden md:block overflow-y-auto rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
        <table className="min-w-full text-sm text-gray-700 rounded-2xl overflow-hidden">
          <thead className="bg-gradient-to-r from-purple-200 via-purple-100 to-purple-200 text-gray-800">
            <tr>
              <th className="p-4 text-left font-semibold">Nombre</th>
              <th className="p-4 text-left font-semibold">Teléfono</th>
              <th className="p-4 text-left font-semibold">Dirección</th>
              <th className="p-4 text-left font-semibold">DNI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length > 0 ? (
              filtered.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-purple-50 transition-all duration-200"
                >
                  <td className="p-4 font-medium text-gray-800">{c.name}</td>
                  <td className="p-4">{c.phone}</td>
                  <td className="p-4">{c.address}</td>
                  <td className="p-4">{c.dni}</td>
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

      {/* 📱 Vista móvil (Cards) */}
      <div className="block md:hidden space-y-3">
        {filtered.length > 0 ? (
          filtered.map((c) => (
            <div
              key={c.id}
              className="
                p-4 bg-gradient-to-br from-purple-50 to-purple-100 
                border border-purple-200 rounded-2xl shadow-sm 
                hover:shadow-md transition-all duration-300
              "
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-purple-900 text-base">
                  {c.name}
                </p>
                <span className="text-xs bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                  DNI {c.dni}
                </span>
              </div>

              <div className="space-y-1 text-sm text-gray-700">
                <p>
                  <span className="font-medium text-gray-600">Teléfono:</span>{" "}
                  {c.phone}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Dirección:</span>{" "}
                  {c.address}
                </p>
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
