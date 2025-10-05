import { FaPhone, FaMapMarkerAlt, FaIdCard } from "react-icons/fa";

interface WorkshopProps {
  name: string;
  nit: string;
  phone: string;
  address: string;
}

type Props = {
  workshop: WorkshopProps;
};

export default function SummaryWorkshop({ workshop }: Props) {
  return (
    <div className="w-full h-full overflow-auto bg-gray-200 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col justify-between">
      {/* Encabezado */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 text-center tracking-tight">
          {workshop.name}
        </h2>

        <div className="mt-2 h-[2px] w-2/3 mx-auto bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full" />

        <div className="mt-5 text-sm text-gray-600 space-y-2">
          <p className="flex items-center justify-center gap-2">
            <FaIdCard className="text-indigo-500" />
            <span>{workshop.nit}</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            <FaPhone className="text-purple-500" />
            <span>{workshop.phone}</span>
          </p>
          <p className="flex items-center justify-center gap-2 text-center">
            <FaMapMarkerAlt className="text-pink-500" />
            <span className="truncate">{workshop.address}</span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex justify-center">
        <span className="text-xs text-gray-400 italic">Taller registrado</span>
      </div>
    </div>
  );
}
