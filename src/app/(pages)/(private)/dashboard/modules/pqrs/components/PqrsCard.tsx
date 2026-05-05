import { Pqrs } from "@/app/types/Pqrs";
import { formatDate } from "@/app/utils/formatDate";
import {
  PqrsStatusBadge,
  PqrsTypeBadge,
} from "@/app/components/ui/PqrsBadges";
import { FaEnvelope, FaUser, FaUserCheck } from "react-icons/fa";

export default function PqrsCard({ pqrs }: { pqrs: Pqrs }) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Radicado
          </p>
          <p className="font-mono text-lg font-bold text-purple-900">
            {pqrs.trackingCode}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <PqrsTypeBadge type={pqrs.type} />
          <PqrsStatusBadge status={pqrs.status} />
        </div>
      </div>

      {/* Solicitante */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-1">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          {pqrs.linkedToAccount ? (
            <FaUserCheck className="text-purple-600" />
          ) : (
            <FaUser className="text-gray-500" />
          )}
          <span className="font-semibold">
            {pqrs.guestName} {pqrs.guestLastName ?? ""}
          </span>
          {pqrs.linkedToAccount && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 ml-2">
              Cliente registrado
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaEnvelope className="text-purple-500" />
          <span>{pqrs.guestEmail}</span>
        </div>
      </div>

      {/* Asunto y mensaje */}
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide">Asunto</p>
        <p className="font-semibold text-gray-800">{pqrs.subject}</p>
      </div>

      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide">Mensaje</p>
        <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 border border-gray-100 rounded-xl p-4 mt-1">
          {pqrs.message}
        </p>
      </div>

      {/* Fechas */}
      <div className="text-xs text-gray-500 flex flex-wrap gap-4">
        <span>Recibida: {formatDate(pqrs.createdAt)}</span>
        {pqrs.respondedAt && (
          <span>Respondida: {formatDate(pqrs.respondedAt)}</span>
        )}
      </div>

      {/* Respuesta */}
      {pqrs.response && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <p className="text-xs text-purple-700 uppercase tracking-wide font-semibold mb-1">
            Respuesta enviada
          </p>
          <p className="text-sm text-gray-800 whitespace-pre-wrap">
            {pqrs.response}
          </p>
        </div>
      )}
    </div>
  );
}