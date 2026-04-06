import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { FaUserCircle, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function ProfileSection() {

  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return null;

  return (
    <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 shadow-sm">

      <h2 className="font-semibold text-purple-800 mb-6">
        Información personal
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
          <FaUserCircle className="text-purple-600"/>
          {user.name} {user.lastName}
        </div>

        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
          <FaEnvelope className="text-purple-600"/>
          {user.email}
        </div>

        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
          <FaPhoneAlt className="text-purple-600"/>
          {user.phone || "No especificado"}
        </div>

      </div>

    </div>
  );
}