import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { FaUserCircle } from "react-icons/fa";

export default function AccountHeader() {

  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return null;

  return (
    <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-purple-900 text-white p-6 shadow-lg">

      <div className="flex items-center gap-4">

        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
          <FaUserCircle size={36}/>
        </div>

        <div>
          <h1 className="text-xl font-semibold">
            {user.name} {user.lastName}
          </h1>

          <p className="text-purple-200 text-sm">
            Administra tu cuenta, taller y seguridad
          </p>
        </div>

      </div>

    </div>
  );
}