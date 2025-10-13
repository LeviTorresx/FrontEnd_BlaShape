import SearchBar from "@/app/components/tables/SearchBar";
import TableContainer from "@/app/components/tables/TableContainer";
import Button from "@/app/components/ui/Button";
import { Furniture } from "@/app/types/Furniture";
import { formatDate } from "@/app/utils/formatDate";
import Image from "next/image";

import { FaEdit, FaEye, FaPlusCircle } from "react-icons/fa";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  filtered: Furniture[];
  onAddPieces?: (furniture: Furniture) => void;
  onView?: (customer: Furniture) => void;
  onEdit?: (customer: Furniture) => void;
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
    <TableContainer title="Muebles">
      {/* Barra de búsqueda */}
      <div className="mb-3 flex justify-end">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar mueble..."
        />
      </div>

      {/* Vista escritorio */}
      <div className="hidden md:block overflow-y-auto rounded-lg border border-gray-100">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-purple-100 text-gray-800">
            <tr>
              <th className="p-3 text-left">Imagen</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Fecha de creación</th>
              <th className="p-3 text-left">Fecha de entrega</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-center">Piezas</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((f) => (
                <tr
                  key={f.furnitureId}
                  className="border-b border-gray-100 hover:bg-purple-50 transition-all"
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
                  <td className="p-3 font-medium text-gray-800">{f.name}</td>
                  <td className="p-3 text-gray-600">
                    {formatDate(f.creationDate)}
                  </td>
                  <td className="p-3 text-gray-600">{formatDate(f.endDate)}</td>
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

                  <td className="p-3">
                    {f.pieces && f.pieces.length > 0 ? (
                      <span className="text-sm text-gray-800 font-medium">
                        {f.pieces.length} pieza{f.pieces.length > 1 ? "s" : ""}
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
                    <div className="flex justify-center gap-2">
                      {/* Ver más */}
                      <button
                        onClick={() => onView?.(f)}
                        className="p-2 text-purple-600 hover:bg-purple-100 rounded-full transition-all"
                        title="Ver más"
                      >
                        <FaEye size={20} />
                      </button>

                      {/* Editar */}
                      <button
                        onClick={() => onEdit?.(f)}
                        className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full transition-all"
                        title="Editar"
                      >
                        <FaEdit size={20} />
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

      {/* Vista móvil */}
      <div className="block md:hidden space-y-3">
        {filtered.length > 0 ? (
          filtered.map((f) => (
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
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-600 mt-1">
                      {formatDate(f.creationDate)}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {formatDate(f.endDate)}
                    </p>
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
                <p className="text-sm text-gray-700">
                  {f.pieces.length} pieza{f.pieces.length > 1 ? "s" : ""}
                </p>
              ) : (
                <div className="flex justify-center">
                  <Button
                    label="Agregar Despiece"
                    onClick={() => onAddPieces?.(f)}
                    icon={<FaPlusCircle />}
                  />
                </div>
              )}

              {/* Botones de acción */}
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => onView?.(f)}
                  className="p-2 text-purple-600 hover:bg-purple-100 rounded-full"
                  title="Ver más"
                >
                  <FaEye size={20} />
                </button>
                <button
                  onClick={() => onEdit?.(f)}
                  className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full"
                  title="Editar"
                >
                  <FaEdit size={20} />
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
