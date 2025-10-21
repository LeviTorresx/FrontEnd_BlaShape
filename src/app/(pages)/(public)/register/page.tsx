'use client';

import CarpenterForm from "@/app/components/forms/CarpenterForm";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import { useRegisterMutation } from "@/app/services/authApi";
import { getErrorMessage } from "@/app/services/getErrorMessages";
import { CarpenterDTO } from "@/app/types/Carpenter";
import { SnackbarState } from "@/app/types/SnackBarState";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

export default function RegisterPage() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "info",
    message: "",
    icon: <MdErrorOutline fontSize="inherit" />,
  });

  const handleRegister = async (data: CarpenterDTO) => {
    try {
      const response = await register(data).unwrap();

      setSnackbar({
        open: true,
        severity: "success",
        message: `¡${response.message}!` || "Registro exitoso!",
        icon: <FaRegCheckCircle fontSize="inherit" />,
      });
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      const errorBack = getErrorMessage(error);

      setSnackbar({
        open: true,
        severity: "error",
        message: errorBack || "Error en el registro. Intenta nuevamente.",
        icon: <MdErrorOutline fontSize="inherit" />,
      });

      console.error("Error en el registro:", errorBack);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4"
      style={{
        backgroundImage: "url('/images/background-login.svg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-md bg-gray-200 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Registrarse
        </h2>

        <CarpenterForm onSubmit={handleRegister} submitLabel="Registrarse" />

        <p className="text-sm text-center text-gray-700 mt-4">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/login"
            className="text-purple-900 font-medium hover:underline"
          >
            Iniciar Sesión
          </a>
        </p>
      </div>

      {/* Logo */}
      <div className="mt-10">
        <Image
          src="/images/logo1CB.webp"
          alt="Logo Blashape"
          width={180}
          height={80}
          className="mx-auto"
        />
      </div>
      <NotificationSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
        icon={snackbar.icon}
        message={snackbar.message}
      />
    </div>
  );
}
