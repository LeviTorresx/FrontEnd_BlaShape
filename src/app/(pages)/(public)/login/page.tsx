"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import PasswordInput from "@/app/components/ui/PasswordInput";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import { MdErrorOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useLoginMutation, useGetProfileQuery } from "@/app/services/authApi";
import { useAppDispatch } from "@/app/hooks/useRedux";
import { setAuthState } from "@/app/store/slices/authSlice";
import { getErrorMessage } from "@/app/services/getErrorMessages";
import { SnackbarState } from "@/app/types/SnackBarState";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loginRequest, setLoginRequest] = useState({ email: "", password: "" });
  const [fetchProfile, setFetchProfile] = useState(false);

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "info",
    message: "",
    icon: <MdErrorOutline fontSize="inherit" />,
  });

  const [login, { isLoading, isSuccess, error }] = useLoginMutation();
  const {
    data: profileData,
    isSuccess: profileSuccess,
    error: profileError,
  } = useGetProfileQuery(undefined, { skip: !fetchProfile });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginRequest.email || !loginRequest.password) {
      setSnackbar({
        open: true,
        severity: "warning",
        message: "Debes ingresar correo y contraseña",
        icon: <MdErrorOutline fontSize="inherit" />,
      });
      return;
    }

    try {
      const response = await login(loginRequest).unwrap();
      setTimeout(() => setFetchProfile(true), 300);

      setSnackbar({
        open: true,
        severity: "success",
        message: `¡${response.message}!` || "Inicio de sesión exitoso!",
        icon: <FaRegCheckCircle fontSize="inherit" />,
      });
    } catch (err) {
      const backendMessage = getErrorMessage(err);

      setSnackbar({
        open: true,
        severity: "error",
        message: backendMessage,
        icon: <MdErrorOutline fontSize="inherit" />,
      });
    }
  };

  useEffect(() => {
    if (profileSuccess && profileData) {
      dispatch(setAuthState({ user: profileData, isAuthenticated: true }));
      router.push("/dashboard");
    }
  }, [profileSuccess, profileData, dispatch, router]);

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
            label={isLoading ? "Entrando..." : "Entrar"}
            type="submit"
            className="w-full py-2 rounded-md bg-purple-900 text-white font-medium shadow-md hover:bg-purple-800 transition-colors"
            disabled={isLoading}
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
