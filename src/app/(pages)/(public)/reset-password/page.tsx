"use client";

import { useState } from "react";
import Image from "next/image";
import PasswordInput from "@/app/components/ui/PasswordInput";
import Button from "@/app/components/ui/Button";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import { MdErrorOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { useResetPasswordMutation } from "@/app/services/authApi";
import { getErrorMessage } from "@/app/services/getErrorMessages";
import { SnackbarState } from "@/app/types/SnackBarState";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "info",
    message: "",
    icon: <MdErrorOutline fontSize="inherit" />,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Las contraseñas no coinciden",
        icon: <MdErrorOutline fontSize="inherit" />,
      });
      return;
    }

    try {
      const response = await resetPassword(password).unwrap();

      setSnackbar({
        open: true,
        severity: "success",
        message: response,
        icon: <FaRegCheckCircle fontSize="inherit" />,
      });

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message: getErrorMessage(err),
        icon: <MdErrorOutline fontSize="inherit" />,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4"
      style={{
        backgroundImage: "url('/images/background-login.svg')",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-sm bg-gray-200 shadow-md rounded-lg p-6">

        <h2 className="text-2xl font-bold text-center mb-6">
          Nueva contraseña
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <PasswordInput
            label="Nueva contraseña"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />

          <PasswordInput
            label="Confirmar contraseña"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="********"
            required
          />

          <Button
            label={isLoading ? "Actualizando..." : "Actualizar contraseña"}
            type="submit"
            disabled={isLoading}
            className="w-full"
          />
        </form>
      </div>

      <div className="mt-10">
        <Image
          src="/images/logo1CB.webp"
          alt="Logo"
          width={180}
          height={80}
        />
      </div>

      <NotificationSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        severity={snackbar.severity}
        icon={snackbar.icon}
        message={snackbar.message}
      />
    </div>
  );
}