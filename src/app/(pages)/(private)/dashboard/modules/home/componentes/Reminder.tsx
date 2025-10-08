import { FaBell, FaClock, FaCalendarAlt } from "react-icons/fa";

export default function Reminder() {
  const reminders = [
    { title: "Entrega de muebles a cliente", date: "05 Oct 2025", time: "10:00 AM" },
    { title: "Llamar al proveedor de madera", date: "06 Oct 2025", time: "2:30 PM" },
    { title: "Revisión de diseño en taller", date: "07 Oct 2025", time: "9:00 AM" },
    { title: "Entrega de sillas en Medellín", date: "08 Oct 2025", time: "3:00 PM" },
    { title: "Reunión con cliente nuevo", date: "09 Oct 2025", time: "11:00 AM" },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-purple-200/60 backdrop-blur-sm border-b border-purple-300 sticky top-0 z-10">
        <h2 className="text-base font-semibold text-purple-900 flex items-center gap-2">
          <FaBell className="text-purple-900" />
          Recordatorios
        </h2>
        <span className="text-xs font-medium text-purple-800 bg-purple-300/50 rounded-full px-2 py-0.5">
          {reminders.length}
        </span>
      </div>

      {/* Lista de recordatorios */}
      <ul className="flex-1 overflow-y-auto p-3 space-y-2">
        {reminders.map((reminder, index) => (
          <li
            key={index}
            className="flex items-start gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-200 hover:shadow-md hover:border-purple-300 transition-all duration-300"
          >
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-100 rounded-full">
              <FaClock className="text-purple-800 text-sm" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 leading-tight">
                {reminder.title}
              </p>
              <div className="flex items-center text-xs text-gray-500 gap-1 mt-1">
                <FaCalendarAlt className="text-gray-400 text-[10px]" />
                <span>{reminder.date}</span>
                <span className="mx-1">•</span>
                <span>{reminder.time}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
