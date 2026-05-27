"use client";

import { ReactNode, useMemo, useState } from "react";
import { FaRegAngry, FaRegCheckCircle, FaCommentDots } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import {
  useGetPqrsByCarpenterQuery,
  useGetPqrsByIdQuery,
  useRespondPqrsMutation,
} from "@/app/services/pqrsApi";
import { Pqrs, PqrsStatus, PqrsType } from "@/app/types/Pqrs";
import { getErrorMessage } from "@/app/services/getErrorMessages";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import AppModal from "@/app/components/ui/AppModal";
import PqrsTable from "./components/PqrsTable";
import PqrsCard from "./components/PqrsCard";
import PqrsRespondForm from "./components/PqrsRespondForm";

export default function PqrsModule() {
  const { data = [] } = useGetPqrsByCarpenterQuery();
  const [respondPqrs] = useRespondPqrsMutation();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<PqrsStatus | "ALL">("ALL");
  const [filterType, setFilterType] = useState<PqrsType | "ALL">("ALL");

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: detailed } = useGetPqrsByIdQuery(selectedId as number, {
    skip: selectedId === null,
    refetchOnMountOrArgChange: true,
  });
  const [openView, setOpenView] = useState(false);
  const [openRespond, setOpenRespond] = useState(false);

  const selected = detailed ?? data.find((p) => p.pqrsId === selectedId) ?? null;

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "info" as "error" | "warning" | "info" | "success",
    message: "",
    icon: <MdErrorOutline fontSize="inherit" /> as ReactNode,
  });

  const showSnackbar = (
    severity: "error" | "warning" | "info" | "success",
    message: string,
    icon: ReactNode
  ) => setSnackbar({ open: true, severity, message, icon });

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const filtered = useMemo(() => {
    return data.filter((p) => {
      if (filterStatus !== "ALL" && p.status !== filterStatus) return false;
      if (filterType !== "ALL" && p.type !== filterType) return false;
      if (!search) return true;
      const haystack = [
        p.trackingCode,
        p.subject,
        p.message,
        p.guestName,
        p.guestEmail,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(search.toLowerCase());
    });
  }, [data, search, filterStatus, filterType]);

  const handleView = (pqrs: Pqrs) => {
    setSelectedId(pqrs.pqrsId);
    setOpenView(true);
  };

  const handleStartRespond = (pqrs: Pqrs) => {
    setSelectedId(pqrs.pqrsId);
    setOpenRespond(true);
  };

  const handleRespond = async (response: string) => {
    if (!selected) return;
    try {
      await respondPqrs({
        id: selected.pqrsId,
        data: { response },
      }).unwrap();
      showSnackbar(
        "success",
        "Respuesta enviada al usuario",
        <FaRegCheckCircle />
      );
    } catch (err) {
      showSnackbar(
        "error",
        getErrorMessage(err) || "Error al enviar la respuesta",
        <FaRegAngry />
      );
    } finally {
      setOpenRespond(false);
      setSelectedId(null);
    }
  };


  const stats = useMemo(() => {
    return {
      total: data.length,
      pendientes: data.filter((p) => p.status === "PENDIENTE").length,
      enProceso: data.filter((p) => p.status === "EN_PROCESO").length,
      resueltas: data.filter((p) => p.status === "RESUELTA").length,
    };
  }, [data]);

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-white via-gray-50 to-purple-50 rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            <FaCommentDots className="text-purple-700" />
            Buzón de PQRS
          </h1>
          <p className="text-sm text-gray-500">
            Gestiona las peticiones, quejas, reclamos y sugerencias recibidas.
          </p>
        </div>
      </div>

      {/* Stats rápidos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <StatPill label="Total" value={stats.total} color="purple" />
        <StatPill label="Pendientes" value={stats.pendientes} color="yellow" />
        <StatPill label="En proceso" value={stats.enProceso} color="blue" />
        <StatPill label="Resueltas" value={stats.resueltas} color="green" />
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as PqrsStatus | "ALL")}
          className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-purple-500"
        >
          <option value="ALL">Todos los estados</option>
          <option value="PENDIENTE">Pendientes</option>
          <option value="EN_PROCESO">En proceso</option>
          <option value="RESUELTA">Resueltas</option>
          <option value="CERRADA">Cerradas</option>
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as PqrsType | "ALL")}
          className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-purple-500"
        >
          <option value="ALL">Todos los tipos</option>
          <option value="PETICION">Peticiones</option>
          <option value="QUEJA">Quejas</option>
          <option value="RECLAMO">Reclamos</option>
          <option value="SUGERENCIA">Sugerencias</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="flex-1 min-h-0">
        <PqrsTable
          filtered={filtered}
          search={search}
          setSearch={setSearch}
          onView={handleView}
          onRespond={handleStartRespond}
        />
      </div>

      {/* Modal: ver detalle */}
      <AppModal
        open={openView}
        onClose={() => { setOpenView(false); setSelectedId(null); }}
        title="Detalle de la PQRS"
        maxWidth="md"
      >
        {selected && <PqrsCard pqrs={selected} />}
      </AppModal>

      {/* Modal: responder */}
      <AppModal
        open={openRespond}
        onClose={() => { setOpenRespond(false); setSelectedId(null); }}
        title={`Responder · ${selected?.trackingCode ?? ""}`}
        maxWidth="sm"
      >
        {selected && (
          <PqrsRespondForm pqrs={selected} onSubmit={handleRespond} />
        )}
      </AppModal>

      <NotificationSnackbar
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
        icon={snackbar.icon}
        message={snackbar.message}
      />
    </div>
  );
}

function StatPill({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "purple" | "yellow" | "blue" | "green";
}) {
  const map: Record<string, string> = {
    purple: "from-purple-100 to-purple-200 text-purple-900",
    yellow: "from-yellow-50 to-yellow-100 text-yellow-800",
    blue: "from-blue-50 to-blue-100 text-blue-800",
    green: "from-green-50 to-green-100 text-green-800",
  };
  return (
    <div
      className={`bg-gradient-to-br ${map[color]} rounded-xl p-4 shadow-sm`}
    >
      <p className="text-xs uppercase tracking-wide opacity-80">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}