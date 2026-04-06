import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { FaShop } from "react-icons/fa6";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function WorkshopSection() {

  const workshop = useSelector(
    (state: RootState) => state.auth.user?.workshop
  );

  if (!workshop) {
    return (
      <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 text-gray-500">
        No hay taller registrado
      </div>
    );
  }

  return (
    <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 shadow-sm">

      <h2 className="font-semibold text-purple-800 mb-6">
        Información del taller
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
          <FaShop className="text-purple-600"/>
          {workshop.name}
        </div>

        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
          <FaPhone className="text-purple-600"/>
          {workshop.phone}
        </div>

        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
          <FaMapMarkerAlt className="text-purple-600"/>
          {workshop.address}
        </div>

      </div>

    </div>
  );
}