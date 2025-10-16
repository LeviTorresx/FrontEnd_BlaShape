import SearchBar from "@/app/components/tables/SearchBar";
import TableContainer from "@/app/components/tables/TableContainer";
import ActionButtonsGroup from "@/app/components/ui/ActionsButton";
import Button from "@/app/components/ui/Button";
import { Furniture } from "@/app/types/Furniture";
import { formatDate } from "@/app/utils/formatDate";
import Image from "next/image";
import { FaCubes, FaPlusCircle } from "react-icons/fa";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  filtered: Furniture[];
  onAddPieces?: (furniture: Furniture) => void;
  onView?: (furniture: Furniture) => void;
  onEdit?: (furniture: Furniture) => void;
};

export default function FurnitureTable({
  search,
  setSearch,
  filtered,
  onAddPieces,
  onEdit,
  onView,
}: Props) {
  return (
    <TableContainer title="Muebles" data={filtered} itemsPerPage={5}>
      {(paginatedData) => (
        <>
          {/*Barra de búsqueda */}
          <div className="mb-3 flex justify-end">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Buscar mueble..."
            />
          </div>

          {/* Vista escritorio */}
          <div className="hidden md:block overflow-y-auto rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-purple-200 text-purple-800 border-b-1">
                <tr>
                  <th className="p-4 text-left font-semibold">Imagen</th>
                  <th className="p-4 text-left font-semibold">Nombre</th>
                  <th className="p-4 text-left font-semibold">
                    Fecha de creación
                  </th>
                  <th className="p-4 text-left font-semibold">
                    Fecha de entrega
                  </th>
                  <th className="p-4 text-left font-semibold">Estado</th>
                  <th className="p-4 text-center font-semibold">Piezas</th>
                  <th className="p-4 text-center font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((f) => (
                    <tr
                      key={f.furnitureId}
                      className="bg-purple-100 hover:bg-purple-50 transition-all duration-200"
                    >
                      <td className="p-3">
                        <Image
                          src={f.imageInitUrl}
                          alt={f.name}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-lg object-cover border border-gray-200 shadow-sm"
                        />
                      </td>
                      <td className="p-3 font-medium text-gray-800">
                        {f.name}
                      </td>
                      <td className="p-3 text-gray-600">
                        {formatDate(f.creationDate)}
                      </td>
                      <td className="p-3 text-gray-600">
                        {formatDate(f.endDate)}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            f.status === "FINALIZADO"
                              ? "bg-gray-200 text-gray-700"
                              : f.status === "EN_PROCESO"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {f.status}
                        </span>
                      </td>

                      <td className="p-3 text-center">
                        {f.pieces && f.pieces.length > 0 ? (
                          <span
                            className={`inline-flex items-center justify-center gap-2 px-3 py-1.5 
                              rounded-full text-sm font-semibold shadow-sm transition-all
                              ${
                                f.pieces.length > 1
                                  ? "bg-purple-100 text-purple-900 border border-purple-200"
                                  : "bg-purple-100 text-purple-600 border border-purple-200"
                              }`}
                          >
                            <FaCubes className="text-sm opacity-80" />
                            {f.pieces.length} pieza
                            {f.pieces.length > 1 ? "s" : ""}
                          </span>
                        ) : (
                          <div className="flex justify-center">
                            <Button
                              label="Agregar Despiece"
                              onClick={() => onAddPieces?.(f)}
                              icon={<FaPlusCircle />}
                            />
                          </div>
                        )}
                      </td>

                      <td className="p-4 text-center">
                        <ActionButtonsGroup
                          onView={() => onView?.(f)}
                          onEdit={() => onEdit?.(f)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center text-gray-500 py-6 italic"
                    >
                      No se encontraron resultados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/*Vista móvil */}
          <div className="block md:hidden space-y-3">
            {paginatedData.length > 0 ? (
              paginatedData.map((f) => (
                <div
                  key={f.furnitureId}
                  className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 
                    border border-purple-200 rounded-2xl shadow-sm 
                    hover:shadow-md transition-all duration-300"
                >
                  {/* Imagen y datos principales */}
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src={f.imageInitUrl}
                      alt={f.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-xl object-cover border border-gray-200 shadow-sm"
                    />
                    <div>
                      <p className="font-semibold text-purple-900 text-base">
                        {f.name}
                      </p>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <p>{formatDate(f.creationDate)}</p>
                        <p>{formatDate(f.endDate)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Estado */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-700 font-medium">
                      Estado:
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        f.status === "FINALIZADO"
                          ? "bg-gray-200 text-gray-700"
                          : f.status === "EN_PROCESO"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {f.status}
                    </span>
                  </div>

                  {/* Piezas o botón */}
                  {f.pieces && f.pieces.length > 0 ? (
                    <div className="flex justify-end mt-2">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                          text-xs font-semibold shadow-sm transition-all duration-300
                          ${
                            f.pieces.length > 1
                              ? "bg-purple-100 text-purple-700 border border-purple-200"
                              : "bg-blue-100 text-blue-700 border border-blue-200"
                          }`}
                      >
                        <FaCubes className="text-sm opacity-80" />
                        {f.pieces.length} pieza
                        {f.pieces.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  ) : (
                    <div className="flex justify-center mt-3">
                      <Button
                        label="Agregar Despiece"
                        onClick={() => onAddPieces?.(f)}
                        icon={<FaPlusCircle />}
                      />
                    </div>
                  )}

                  {/* Acciones */}
                  <div className="flex justify-end">
                    <ActionButtonsGroup
                      onView={() => onView?.(f)}
                      onEdit={() => onEdit?.(f)}
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
