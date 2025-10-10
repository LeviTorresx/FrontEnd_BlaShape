import { Alert } from "@/app/types/Alert";
import { formatDate } from "@/app/utils/formatDate";
import { FaBell, FaClock, FaCalendarAlt, FaPlus } from "react-icons/fa";

interface Props {
  reminders: Alert[];
  onAdd?: () => void; // 🔹 función para abrir el modal o formulario
}

export default function Reminder({ reminders, onAdd }: Props) {
  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "HIGH":
        return {
          bg: "bg-red-50",
          iconBg: "bg-red-100 text-red-700",
          dot: "bg-red-500",
        };
      case "MEDIUM":
        return {
          bg: "bg-yellow-50 ",
          iconBg: "bg-yellow-100 text-yellow-700",
          dot: "bg-yellow-500",
        };
      case "LOW":
        return {
          bg: "bg-green-50 ",
          iconBg: "bg-green-100 text-green-700",
          dot: "bg-green-500",
        };
      default:
        return {
          bg: "bg-gray-50 border-gray-300",
          iconBg: "bg-gray-100 text-gray-700",
          dot: "bg-gray-500",
        };
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-purple-200/60 backdrop-blur-sm border-b border-purple-300 sticky top-0 z-10">
        {/* Título + contador */}
        <div className="flex items-center gap-2">
          <FaBell className="text-purple-900" />
          <h2 className="text-base font-semibold text-purple-900">Recordatorios</h2>
          <span className="text-xs font-medium text-purple-800 bg-purple-300/50 rounded-full px-2 py-0.5">
            {reminders.length}
          </span>
        </div>

        {/* Botón agregar */}
        <button
          onClick={onAdd}
          className="bg-purple-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md hover:bg-purple-700 active:scale-95 transition-transform"
          title="Agregar recordatorio"
        >
          <FaPlus className="text-sm" />
        </button>
      </div>

      {/* Lista */}
      <ul className="flex-1 overflow-y-auto p-3 space-y-2">
        {reminders.map((reminder) => {
          const style = getSeverityStyle(reminder.severity);

          return (
            <li
              key={reminder.alertId}
              className={`flex items-start gap-3 rounded-xl p-3 transition-all duration-300 hover:shadow-md ${style.bg}`}
            >
              {/* Icono */}
              <div
                className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${style.iconBg}`}
              >
                <FaClock className="text-sm" />
              </div>

              {/* Contenido */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-800 leading-tight">
                    {reminder.mensaje}
                  </p>
                  <span
                    className={`w-2 h-2 rounded-full ${style.dot} ml-2`}
                    title={reminder.severity}
                  />
                </div>

                <div className="flex items-center text-xs text-gray-500 gap-1 mt-1">
                  <FaCalendarAlt className="text-gray-400 text-[10px]" />
                  <span>{formatDate(reminder.date)}</span>
                  <span className="mx-1">•</span>
                  <span>{reminder.time}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
