"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import PasswordInput from "@/app/components/ui/PasswordInput";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import { MdErrorOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";

export default function LoginPage() {
  const [loginRequest, setLoginRequest] = useState({ email: "", password: "" });

  // estado para notificaciones
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "info" as "error" | "warning" | "info" | "success",
    message: "",
    icon: <MdErrorOutline fontSize="inherit" />,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginRequest.email || !loginRequest.password) {
      setSnackbar({
        open: true,
        severity: "success",
        message: "Debes ingresar correo y contraseña",
        icon: <MdErrorOutline fontSize="inherit" />,
      });
      return;
    }

    // Simulación de login exitoso
    console.log(
      "Correo:",
      loginRequest.email,
      "Contraseña:",
      loginRequest.password
    );
    setSnackbar({
      open: true,
      severity: "success",
      message: "¡Inicio de sesión exitoso!",
      icon: <FaRegCheckCircle fontSize="inherit" />,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
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
      {/* Card */}
      <div className="w-full max-w-sm bg-gray-200 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Correo Electrónico"
            name="email"
            type="email"
            value={loginRequest.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            required
          />

          <PasswordInput
            label="Contraseña"
            name="password"
            value={loginRequest.password}
            onChange={handleChange}
            placeholder="********"
            required
          />

          <Button
            label="Entrar"
            type="submit"
            className="w-full py-2 rounded-md bg-purple-900 text-white font-medium shadow-md hover:bg-purple-800 transition-colors"
          />
        </form>

        <p className="text-sm text-center text-gray-700 mt-4">
          ¿No tienes cuenta?{" "}
          <a
            href="/register"
            className="text-purple-900 font-medium hover:underline"
          >
            Regístrate
          </a>
        </p>
      </div>

      <div className="mt-10">
        <Image
          src="/images/logo1CB.webp"
          alt="Logo Blashape"
          width={180}
          height={80}
          className="mx-auto"
        />
      </div>

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
