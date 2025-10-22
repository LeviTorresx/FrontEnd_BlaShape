"use client";

import { useState } from "react";
import {
  FaIndustry,
  FaEdit,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUserCog,
  FaStoreAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { Workshop } from "@/app/types/Workshop";
import AppModal from "@/app/components/ui/AppModal";
import WorkshopForm from "@/app/components/forms/WorkshopForm";
import Button from "@/app/components/ui/Button";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useEditWorkshopMutation } from "@/app/services/workshopApi";
import { getErrorMessage } from "@/app/services/getErrorMessages";
import { useAppDispatch } from "@/app/hooks/useRedux";
import { setUserWorkshop } from "@/app/store/slices/authSlice";

export default function WorkshopModule() {
  const workshop = useSelector((state: RootState) => state.auth.user?.workshop);
  const carpenter = useSelector((state: RootState) => state.auth.user);

  const dispatch = useAppDispatch();

  const [editWorshop, { isError, isLoading }] = useEditWorkshopMutation();

  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "info" as "error" | "warning" | "info" | "success",
    message: "",
    icon: <MdErrorOutline fontSize="inherit" />,
  });

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const handleUpdateWorkshop = async (data: Workshop) => {

    try {
      const response = await editWorshop(data).unwrap();

      dispatch(setUserWorkshop(response.workshop));

      setSnackbar({
        open: true,
        severity: "success",
        message: response.message || "Taller actualizado exitosamente",
        icon: <FaCheckCircle fontSize="inherit" />,
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      setSnackbar({
        open: true,
        severity: "error",
        message: errorMessage || "Error al actualizar el taller",
        icon: <MdErrorOutline fontSize="inherit" />,
      });
    }

    setOpen(false);
  };

  return (
    <div className="relative overflow-hidden p-6 md:p-10 bg-gradient-to-br from-purple-50 via-white to-purple-100 rounded-2xl shadow-lg border border-purple-100 h-full flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-900 shadow-md">
              <FaIndustry className="text-white text-lg" />
            </div>
            Informacion del Taller
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Administra y consulta la información general de tu taller.
          </p>
        </div>

        <Button
          label="Editar información"
          icon={<FaEdit className="text-sm" />}
          onClick={() => setOpen(true)}
          className=" hover:scale-[1.02]"
        />
      </div>

      {/* Datos del taller */}
      {workshop ? (
        <div
          className="grid md:grid-cols-2 gap-8 bg-white/80 border border-purple-100 rounded-2xl 
          shadow-sm p-8 backdrop-blur-sm hover:shadow-md transition-all duration-300"
        >
          <div className="space-y-5 text-gray-800">
            <div className="group">
              <p className="text-sm text-gray-500">Nombre del taller</p>
              <p className="text-lg font-semibold text-gray-900 flex items-center gap-2 group-hover:text-purple-700 transition-colors">
                <FaStoreAlt className="text-purple-900" size={25} />{" "}
                {workshop.name}
              </p>
            </div>

            <div className="group">
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="text-base font-medium flex items-center gap-2 group-hover:text-purple-700 transition-colors">
                <FaPhoneAlt className="text-purple-900" size={25} />
                {workshop.phone}
              </p>
            </div>

            <div className="group">
              <p className="text-sm text-gray-500">Dirección</p>
              <p className="text-base font-medium flex items-center gap-2 group-hover:text-purple-700 transition-colors">
                <FaMapMarkerAlt className="text-purple-900" size={25} />{" "}
                {workshop.address}
              </p>
            </div>
          </div>

          {/* Panel derecho */}
          <div className="flex flex-col justify-between space-y-4 md:space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-xl px-5 py-4 shadow-inner text-sm text-purple-800 max-w-xs self-end">
              <p className="font-medium flex items-center gap-2 mb-1">
                <FaUserCog className="text-purple-500" />
                Administrador del taller
              </p>
              <p className="text-gray-700 font-medium">
                {`${carpenter?.name} ${carpenter?.lastName}` ||
                  "No especificado"}
              </p>
            </div>

            <div className="text-xs text-gray-400 text-right">
              Última revisión:{" "}
              <span className="font-medium text-gray-600">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm text-center text-gray-500">
          No se encontró información del taller registrada.
        </div>
      )}

      {/* Modal editar */}
      <AppModal
        open={open}
        onClose={() => setOpen(false)}
        title="Editar información del taller"
        maxWidth="sm"
      >
        {workshop && (
          <WorkshopForm
            initialData={workshop}
            onSubmit={handleUpdateWorkshop}
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
