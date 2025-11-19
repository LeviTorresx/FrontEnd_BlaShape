import SearchBar from "@/app/components/tables/SearchBar";
import TableContainer from "@/app/components/tables/TableContainer";
import ActionButtonsGroup from "@/app/components/ui/ActionsButton";
import { Customer } from "@/app/types/Customer";


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
    <TableContainer
      title="Clientes registrados"
      data={filtered}
      itemsPerPage={6}
    >
      {(paginatedData) => (
        <>
          {/*Barra de búsqueda */}
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
              <thead className="bg-purple-200 text-purple-800 border-b-1">
                <tr>
                  <th className="p-4 text-left font-semibold">Nombre</th>
                  <th className="p-4 text-left font-semibold">Teléfono</th>
                  <th className="p-4 text-left font-semibold">Correo</th>
                  <th className="p-4 text-left font-semibold">DNI</th>
                  <th className="p-4 text-center font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.length > 0 ? (
                  paginatedData.map((c) => (
                    <tr
                      key={c.customerId}
                      className="bg-purple-100 hover:bg-purple-50 transition-all duration-200"
                    >
                      <td className="p-4 font-medium text-gray-800">
                        {c.name}
                      </td>
                      <td className="p-4">{c.phone}</td>
                      <td className="p-4">{c.email}</td>
                      <td className="p-4">{c.dni}</td>
                      <td className="p-4 text-center">
                        <ActionButtonsGroup
                          onView={() => onView?.(c)}
                          onEdit={() => onEdit?.(c)}
                          onDelete={() => onDelete?.(c)}
                        />
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

          {/* (Cards) */}
          <div className="block md:hidden space-y-3">
            {paginatedData.length > 0 ? (
              paginatedData.map((c) => (
                <div
                  key={c.customerId}
                  className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 
                             border border-purple-200 rounded-2xl shadow-sm 
                             hover:shadow-md transition-all duration-300"
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
                      <span className="font-medium text-gray-600">
                        Teléfono:
                      </span>{" "}
                      {c.phone}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">Correo:</span>{" "}
                      {c.email}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <ActionButtonsGroup
                      onView={() => onView?.(c)}
                      onEdit={() => onEdit?.(c)}
                      onDelete={() => onDelete?.(c)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-6 italic">
                No se encontraron resultados
              </p>
            )}
          </div>
        </>
      )}
    </TableContainer>
  );
}
