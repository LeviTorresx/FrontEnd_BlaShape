"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { FaUserCircle, FaEnvelope, FaPhoneAlt, FaEdit } from "react-icons/fa";
import Button from "@/app/components/ui/Button";
import AppModal from "@/app/components/ui/AppModal";
import CarpenterForm from "@/app/components/forms/CarpenterForm";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import { MdErrorOutline } from "react-icons/md";
import { Carpenter } from "@/app/types/Carpenter";
import { useAppDispatch } from "@/app/hooks/useRedux";
import { setUser } from "@/app/store/slices/authSlice";
import { useEditProfileMutation } from "@/app/services/authApi";
import { getErrorMessage } from "@/app/services/getErrorMessages";

export default function ProfileSection() {

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [editProfile] = useEditProfileMutation();
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "info" as "error" | "warning" | "info" | "success",
    message: "",
    icon: <MdErrorOutline fontSize="inherit" />,
  });

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
      setSnackbar({
        open: true,
        severity: "error",
        message: getErrorMessage(error),
        icon: <MdErrorOutline fontSize="inherit" />,
      });
    }
    setOpen(false);
  };

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

      <div className="flex justify-center mt-6">
        <Button
          label="Editar perfil"
          icon={<FaEdit className="text-xs" />}
          onClick={() => setOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg shadow-sm"
        />
      </div>

      <AppModal open={open} onClose={() => setOpen(false)} title="Editar perfil" maxWidth="sm">
        <CarpenterForm
          mode="edit"
          initialData={user}
          submitLabel="Guardar cambios"
          onSubmit={handleUpdateProfile}
        />
      </AppModal>

      <NotificationSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        severity={snackbar.severity}
        icon={snackbar.icon}
        message={snackbar.message}
      />

    </div>
  );
}