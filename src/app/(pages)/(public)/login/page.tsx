"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import PasswordInput from "@/app/components/ui/PasswordInput";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import { MdErrorOutline, MdOutlineArrowBack } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useLoginMutation, useGetProfileQuery, useResendVerificationMutation } from "@/app/services/authApi";
import { useAppDispatch } from "@/app/hooks/useRedux";
import { setAuthState } from "@/app/store/slices/authSlice";
import { getErrorMessage } from "@/app/services/getErrorMessages";
import { SnackbarState } from "@/app/types/SnackBarState";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loginRequest, setLoginRequest] = useState({ email: "", password: "" });
  const [fetchProfile, setFetchProfile] = useState(false);
  const [resendVerification] = useResendVerificationMutation();
  const [showResend, setShowResend] = useState(false);
  const [emailForResend, setEmailForResend] = useState("");

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
        message:
          typeof response === "string"
            ? response
            : response?.message ?? "Inicio de sesión exitoso",
        icon: <FaRegCheckCircle fontSize="inherit" />,
      });
    } catch (err) {
      const backendMessage = getErrorMessage(err);

      if (backendMessage.toLowerCase().includes("verificar")) {
        setShowResend(true);
        setEmailForResend(loginRequest.email);
      }

      setSnackbar({
        open: true,
        severity: "error",
        message: backendMessage,
        icon: <MdErrorOutline fontSize="inherit" />,
      });
    }
  };

  const handleResend = async () => {
    try {
      await resendVerification(emailForResend).unwrap();

      setSnackbar({
        open: true,
        severity: "success",
        message: "Correo de verificación reenviado",
        icon: <FaRegCheckCircle fontSize="inherit" />,
      });
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message: getErrorMessage(err),
        icon: <MdErrorOutline fontSize="inherit" />,
      });
    }
  };

  useEffect(() => {
    if (profileSuccess && profileData) {
      dispatch(setAuthState({ user: profileData, isAuthenticated: true }));
      if (profileData?.workshop != null) {
        router.push("/dashboard");
      } else {
        router.push("/workshop-register");
      }
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
        <div className="flex justify-center gap-5">
          <Link
            href="/"
            className="mt-0.5"
          >
            <MdOutlineArrowBack className="text-3xl" />
          </Link>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Iniciar Sesión
          </h2>
        </div>

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

        {showResend && (
          <button
            onClick={handleResend}
            className="text-purple-900 underline text-sm mt-2"
          >
            Reenviar correo de verificación
          </button>
        )}

        <p className="text-sm text-center text-gray-700 mt-4">
          ¿No tienes cuenta?{" "}
          <a
            href="/register"
            className="text-purple-900 font-medium hover:underline"
          >
            Regístrate
          </a>
        </p>

        <p className="text-sm text-center mt-2">
          <a href="/forgot-password" className="text-purple-900 hover:underline">
            ¿Olvidaste tu contraseña?
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
