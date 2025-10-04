import { FaBell, FaClock, FaCalendarAlt } from "react-icons/fa";

export default function Reminder() {
  const reminders = [
    {
      title: "Entrega de muebles a cliente",
      date: "05 Oct 2025",
      time: "10:00 AM",
    },
    {
      title: "Revisión de materiales",
      date: "06 Oct 2025",
      time: "03:30 PM",
    },
    {
      title: "Cita con proveedor",
      date: "08 Oct 2025",
      time: "09:00 AM",
    },
  ];

  return (
    <div className="w-full bg-gray-100 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaBell className="text-purple-900" />
          Recordatorios
        </h2>
      </div>

      {/* Lista */}
      <ul className="space-y-3">
        {reminders.map((reminder, index) => (
          <li
            key={index}
            className="flex items-start gap-3 bg-white rounded-xl p-3 border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition-all duration-300"
          >
            <div className="flex-shrink-0 mt-1">
              <FaClock className="text-purple-900" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">
                {reminder.title}
              </p>
              <div className="flex items-center text-xs text-gray-500 gap-2 mt-1">
                <FaCalendarAlt className="text-gray-400" />
                <span>{reminder.date}</span>
                <span>•</span>
                <span>{reminder.time}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
