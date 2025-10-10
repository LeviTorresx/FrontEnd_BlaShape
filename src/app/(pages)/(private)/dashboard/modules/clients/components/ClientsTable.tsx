import SearchBar from "@/app/components/tables/SearchBar";
import TableContainer from "@/app/components/tables/TableContainer";
import { Customer } from "@/app/types/Customer";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  filtered: Customer[];
  onView?: (customer: Customer) => void;
  onEdit?: (customer: Customer) => void;
  onDelete?: (customer: Customer) => void;
};

export default function ClientsTable({
  search,
  setSearch,
  filtered,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <TableContainer title="Clientes registrados">
      {/* Barra de búsqueda */}
      <div className="mb-5 flex justify-end">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar cliente..."
        />
      </div>

      {/* Vista de escritorio */}
      <div className="hidden md:block overflow-y-auto rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
        <table className="min-w-full text-sm text-gray-700 rounded-2xl overflow-hidden">
          <thead className="bg-gradient-to-r from-purple-200 via-purple-100 to-purple-200 text-gray-800">
            <tr>
              <th className="p-4 text-left font-semibold">Nombre</th>
              <th className="p-4 text-left font-semibold">Teléfono</th>
              <th className="p-4 text-left font-semibold">Correo</th>
              <th className="p-4 text-left font-semibold">DNI</th>
              <th className="p-4 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length > 0 ? (
              filtered.map((c) => (
                <tr
                  key={c.customerId}
                  className="hover:bg-purple-50 transition-all duration-200"
                >
                  <td className="p-4 font-medium text-gray-800">{c.name}</td>
                  <td className="p-4">{c.phone}</td>
                  <td className="p-4">{c.email}</td>
                  <td className="p-4">{c.dni}</td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      {/* Ver más */}
                      <button
                        onClick={() => onView?.(c)}
                        className="p-2 text-purple-600 hover:bg-purple-100 rounded-full transition-all"
                        title="Ver más"
                      >
                        <FaEye size={20} />
                      </button>

                      {/* Editar */}
                      <button
                        onClick={() => onEdit?.(c)}
                        className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full transition-all"
                        title="Editar"
                      >
                        <FaEdit size={20} />
                      </button>

                      {/* Eliminar */}
                      <button
                        onClick={() => onDelete?.(c)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-all"
                        title="Eliminar"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-gray-500 py-6 italic"
                >
                  No se encontraron resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Vista móvil (Cards) */}
      <div className="block md:hidden space-y-3">
        {filtered.length > 0 ? (
          filtered.map((c) => (
            <div
              key={c.customerId}
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

              <div className="space-y-1 text-sm text-gray-700 mb-3">
                <p>
                  <span className="font-medium text-gray-600">Teléfono:</span>{" "}
                  {c.phone}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Correo:</span>{" "}
                  {c.email}
                </p>
              </div>

              {/* Botones en móvil */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => onView?.(c)}
                  className="p-2 text-purple-600 hover:bg-purple-100 rounded-full"
                  title="Ver más"
                >
                  <FaEye size={20} />
                </button>
                <button
                  onClick={() => onEdit?.(c)}
                  className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full"
                  title="Editar"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => onDelete?.(c)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                  title="Eliminar"
                >
                  <FaTrash size={20} />
                </button>
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
