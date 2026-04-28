"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/hooks/useRedux";
import { RootState } from "@/app/store/store";
import { FaShop } from "react-icons/fa6";
import { FaPhone, FaMapMarkerAlt, FaEdit } from "react-icons/fa";
import { MdErrorOutline, MdCheckCircle } from "react-icons/md";
import Button from "@/app/components/ui/Button";
import AppModal from "@/app/components/ui/AppModal";
import WorkshopForm from "@/app/components/forms/WorkshopForm";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import { Workshop } from "@/app/types/Workshop";
import { setUser } from "@/app/store/slices/authSlice";
import { useEditWorkshopMutation } from "@/app/services/workshopApi";
import { getErrorMessage } from "@/app/services/getErrorMessages";

export default function WorkshopSection() {

  const user = useSelector((state: RootState) => state.auth.user);
  const workshop = user?.workshop;
  const dispatch = useAppDispatch();
  const [editWorkshop] = useEditWorkshopMutation();
  const [open, setOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "info" as "error" | "warning" | "info" | "success",
    message: "",
    icon: <MdErrorOutline fontSize="inherit" />,
  });

  const handleUpdateWorkshop = async (data: Workshop) => {
    try {
      const response = await editWorkshop(data).unwrap();
      dispatch(setUser({ ...user!, workshop: response.workshop }));
      setSnackbar({
        open: true,
        severity: "success",
        message: response.message || "Taller actualizado correctamente.",
        icon: <MdCheckCircle fontSize="inherit" />,
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

      <div className="flex justify-center mt-6">
        <Button
          label="Editar taller"
          icon={<FaEdit className="text-xs" />}
          onClick={() => setOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg shadow-sm"
        />
      </div>

      <AppModal open={open} onClose={() => setOpen(false)} title="Editar taller" maxWidth="sm">
        <WorkshopForm
          initialData={workshop}
          carpenterId={user?.carpenterId}
          submitLabel="Guardar cambios"
          onSubmit={handleUpdateWorkshop}
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