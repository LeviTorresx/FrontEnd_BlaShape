import SearchBar from "@/app/components/tables/SearchBar";
import TableContainer from "@/app/components/tables/TableContainer";
import {
  PqrsStatusBadge,
  PqrsTypeBadge,
} from "@/app/components/ui/PqrsBadges";
import { Pqrs } from "@/app/types/Pqrs";
import { formatDate } from "@/app/utils/formatDate";
import { FaEye, FaReply } from "react-icons/fa";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  filtered: Pqrs[];
  onView: (p: Pqrs) => void;
  onRespond: (p: Pqrs) => void;
};

export default function PqrsTable({
  search,
  setSearch,
  filtered,
  onView,
  onRespond,
}: Props) {
  return (
    <TableContainer title="PQRS recibidas" data={filtered} itemsPerPage={6}>
      {(paginated) => (
        <>
          <div className="mb-4 flex justify-end">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Buscar por código, asunto, correo..."
            />
          </div>

          {/* Vista escritorio */}
          <div className="hidden md:block overflow-y-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-purple-200 text-purple-800">
                <tr>
                  <th className="p-3 text-left">Radicado</th>
                  <th className="p-3 text-left">Tipo</th>
                  <th className="p-3 text-left">Asunto</th>
                  <th className="p-3 text-left">De</th>
                  <th className="p-3 text-left">Fecha</th>
                  <th className="p-3 text-left">Estado</th>
                  <th className="p-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.length > 0 ? (
                  paginated.map((p) => (
                    <tr
                      key={p.pqrsId}
                      className="bg-white hover:bg-purple-50 transition-colors"
                    >
                      <td className="p-3 font-mono text-xs text-purple-900">
                        {p.trackingCode}
                      </td>
                      <td className="p-3">
                        <PqrsTypeBadge type={p.type} />
                      </td>
                      <td className="p-3 max-w-[220px] truncate" title={p.subject}>
                        {p.subject}
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-800">
                            {p.guestName} {p.guestLastName ?? ""}
                          </span>
                          <span className="text-xs text-gray-500">
                            {p.guestEmail}
                          </span>
                          {p.linkedToAccount && (
                            <span className="text-[10px] mt-0.5 text-purple-700 font-semibold">
                              Cliente registrado
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-xs text-gray-500">
                        {formatDate(p.createdAt)}
                      </td>
                      <td className="p-3">
                        <PqrsStatusBadge status={p.status} />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-2">
                          <IconBtn
                            title="Ver"
                            onClick={() => onView(p)}
                            color="purple"
                          >
                            <FaEye />
                          </IconBtn>
                          <IconBtn
                            title="Responder"
                            disabled={p.status === "CERRADA"}
                            onClick={() => onRespond(p)}
                            color="green"
                          >
                            <FaReply />
                          </IconBtn>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center text-gray-500 py-6 italic">
                      No hay PQRS para los filtros seleccionados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Vista móvil */}
          <div className="block md:hidden space-y-3">
            {paginated.map((p) => (
              <div
                key={p.pqrsId}
                className="p-4 bg-white border border-purple-100 rounded-2xl shadow-sm"
                onClick={() => onView(p)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono text-purple-900">
                    {p.trackingCode}
                  </span>
                  <PqrsStatusBadge status={p.status} />
                </div>
                <p className="font-semibold text-gray-800 text-sm">
                  {p.subject}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {p.guestName} · {formatDate(p.createdAt)}
                </p>
                <div className="mt-2">
                  <PqrsTypeBadge type={p.type} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </TableContainer>
  );
}

function IconBtn({
  children,
  onClick,
  color,
  title,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  color: "purple" | "green" | "red";
  title: string;
  disabled?: boolean;
}) {
  const map = {
    purple: "text-purple-700 hover:bg-purple-100",
    green: "text-green-700 hover:bg-green-100",
    red: "text-red-700 hover:bg-red-100",
  };
  return (
    <button
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${map[color]}`}
    >
      {children}
    </button>
  );
}