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
    <div
      className="
        w-full h-full max-w-md mx-auto
        bg-purple-100 backdrop-blur-sm 
        rounded-2xl border border-gray-100 shadow-md
        hover:shadow-lg transition-all duration-300
        flex flex-col justify-between
        p-6
      "
    >
      {/* Encabezado */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
          {workshop.name}
        </h2>

        <div className="mt-2 h-[3px] w-1/3 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
      </div>

      {/* Información */}
      <div className="mt-6 space-y-4 text-gray-600 text-sm sm:text-base">
        <p className="flex items-center gap-3 justify-center">
          <FaIdCard className="text-indigo-500 text-lg" />
          <span className="font-medium">{workshop.nit}</span>
        </p>

        <p className="flex items-center gap-3 justify-center">
          <FaPhone className="text-purple-500 text-lg" />
          <span className="font-medium">{workshop.phone}</span>
        </p>

        <p className="flex items-start gap-3 justify-center text-center">
          <FaMapMarkerAlt className="text-pink-500 text-lg mt-[2px]" />
          <span className="font-medium leading-snug max-w-[85%]">
            {workshop.address}
          </span>
        </p>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <span className="text-xs text-gray-400 italic select-none">
          Taller verificado y registrado en la plataforma
        </span>
      </div>
    </div>
  );
}
