"use client";

import { useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaIdBadge,
  FaIndustry,
  FaEdit,
} from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import AppModal from "@/app/components/ui/AppModal";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import CarpenterForm from "@/app/components/forms/CarpenterForm";
import Button from "@/app/components/ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { getErrorMessage } from "@/app/services/getErrorMessages";
import { Carpenter } from "@/app/types/Carpenter";
import Link from "next/link";
import { useAppDispatch } from "@/app/hooks/useRedux";
import { setUser } from "@/app/store/slices/authSlice";
import { useEditProfileMutation } from "@/app/services/authApi";

export default function ProfileModule() {
  const [open, setOpen] = useState(false);
  const [editProfile] = useEditProfileMutation();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "info" as "error" | "warning" | "info" | "success",
    message: "",
    icon: <MdErrorOutline fontSize="inherit" />,
  });

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const handleUpdateProfile = async (data: Carpenter) => {
    try {
      const response = await editProfile(data).unwrap();
      dispatch(setUser(response.carpenter));

      setSnackbar({
        open: true,
        severity: "success",
        message: response.message || "Perfil actualizado correctamente.",
        icon: <FaUserCircle fontSize="inherit" />,
      });

    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setSnackbar({
        open: true,
        severity: "error",
        message: errorMessage,
        icon: <MdErrorOutline fontSize="inherit" />,
      });
    }
    setOpen(false);
  };

  if (!user) {
    return (
      <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm text-center text-gray-500">
        No se ha encontrado información del usuario.
      </div>
    );
  }

  return (
    <div
      className="p-8 md:p-10 bg-gradient-to-br from-purple-50 via-white to-gray-50 
      rounded-3xl shadow-md border border-gray-200 h-full flex flex-col items-center"
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-purple-700 shadow-md flex items-center justify-center">
          <FaUserCircle className="text-white text-5xl" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          {`${user.name} ${user.lastName}`}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Consulta y actualiza tu información personal.
        </p>

        <Button
          label="Editar perfil"
          icon={<FaEdit className="text-sm" />}
          onClick={() => setOpen(true)}
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-sm"
        />
      </div>

      {/* Datos */}
      <div
        className="grid sm:grid-cols-2 gap-6 w-full max-w-3xl bg-white/80 backdrop-blur-sm border border-gray-100 
        rounded-2xl shadow-sm p-8 hover:shadow-lg transition-all duration-300"
      >
        <div className="space-y-5 text-gray-800">
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaIdBadge className="text-purple-600 text-lg" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Nombre completo</p>
              <p className="text-base font-semibold text-gray-900">
                {`${user.name} ${user.lastName}`}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaEnvelope className="text-purple-600 text-lg" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Correo electrónico</p>
              <p className="text-base font-medium text-gray-900">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaPhoneAlt className="text-purple-600 text-lg" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="text-base font-medium text-gray-900">
                {user.phone || "No especificado"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-start sm:items-end space-y-4">
          {user.workshop && (
            <Link
              href={"/dashboard/workshop"}
              className="bg-purple-50 border border-purple-100 rounded-xl px-5 py-4 shadow-sm text-sm text-purple-700 max-w-xs"
            >
              <p className="font-medium text-gray-700">Taller asociado</p>
              <p className="mt-1 flex items-center gap-2 text-gray-800">
                <FaIndustry className="text-purple-500" />
                {user.workshop.name}
              </p>
            </Link>
          )}
          <div className="text-xs text-gray-400 self-end">
            Última actualización:{" "}
            <span className="font-medium text-gray-600">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Modal editar */}
      <AppModal
        open={open}
        onClose={() => setOpen(false)}
        title="Editar perfil"
        maxWidth="sm"
      >
        {user && (
          <CarpenterForm
            mode="edit"
            initialData={user}
            submitLabel="Guardar cambios"
            onSubmit={handleUpdateProfile}
          />
        )}
      </AppModal>

      {/* Snackbar */}
      <NotificationSnackbar
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
        icon={snackbar.icon}
        message={snackbar.message}
      />
    </div>
  );
}
