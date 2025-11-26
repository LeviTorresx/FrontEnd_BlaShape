import { Carpenter } from "@/app/types/Carpenter";
import { FaUserTie, FaPhoneAlt, FaIdCard, FaEnvelope } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

type Props = {
  carpenter: Carpenter;
};

export default function SummaryCarpenter({ carpenter }: Props) {
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
        <div className="bg-purple-200 p-3 rounded-full shadow-inner mb-1">
          <FaUserTie className="text-purple-700 text-3xl" />
        </div>

        {/* Título indicando que es el carpintero */}
        <h3 className="text-sm text-purple-700 font-semibold">CARPINTERO</h3>

        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 tracking-tight">
          {carpenter.name} {carpenter.lastName}
        </h2>

        <div className="mt-2 h-[3px] w-1/3 mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
      </div>

      {/* Información */}
      <div className="mt-6 space-y-2 text-gray-700 text-sm md:text-base">
        <div className="flex items-center gap-3 justify-center">
          <FaIdCard className="text-purple-600 text-lg" />
          <span className="font-medium">
            DNI: {carpenter.dni}
          </span>
        </div>

        <div className="flex items-center gap-3 justify-center">
          <FaPhoneAlt className="text-purple-600 text-lg" />
          <span className="font-medium">{carpenter.phone}</span>
        </div>

        <div className="flex items-center gap-3 justify-center">
          <FaEnvelope className="text-purple-600 text-lg" />
          <span className="font-medium">{carpenter.email}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-center gap-2 text-center">
        <MdVerified className="text-green-500 text-xl" />
        <span className="text-xs text-gray-500 italic">
          Carpintero verificado en la plataforma
        </span>
      </div>
    </div>
  );
}
