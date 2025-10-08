import { FaPhoneAlt, FaMapMarkerAlt, FaBuilding, FaTools } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

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
    <div
      className="
        w-full h-full max-w-md mx-auto
        bg-gradient-to-br from-purple-50 to-purple-100
        rounded-2xl border border-purple-200 shadow-sm
        hover:shadow-lg transition-all duration-300
        flex flex-col justify-between p-6 overflow-hidden
      "
    >
      {/* Encabezado */}
      <div className="flex flex-col items-center text-center">
        <div className="bg-purple-200 p-3 rounded-full shadow-inner mb-3">
          <FaTools className="text-purple-700 text-3xl" />
        </div>

        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 tracking-tight">
          {workshop.name}
        </h2>

        <div className="mt-2 h-[3px] w-1/3 mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
      </div>

      {/* Información del taller */}
      <div className="mt-6 space-y-4 text-gray-700 text-sm md:text-base">
        <div className="flex items-center gap-3 justify-center">
          <FaBuilding className="text-purple-600 text-lg" />
          <span className="font-medium">NIT: {workshop.nit}</span>
        </div>

        <div className="flex items-center gap-3 justify-center">
          <FaPhoneAlt className="text-purple-600 text-lg" />
          <span className="font-medium">{workshop.phone}</span>
        </div>

        <div className="flex items-start gap-3 justify-center text-center">
          <FaMapMarkerAlt className="text-purple-600 text-lg mt-[2px]" />
          <span className="font-medium leading-snug max-w-[85%]">
            {workshop.address}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-center gap-2 text-center">
        <MdVerified className="text-green-500 text-xl" />
        <span className="text-xs text-gray-500 italic">
          Taller verificado en la plataforma
        </span>
      </div>
    </div>
  );
}
