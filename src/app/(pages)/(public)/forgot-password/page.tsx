"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import { MdErrorOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { useForgotPasswordMutation } from "@/app/services/authApi";
import { getErrorMessage } from "@/app/services/getErrorMessages";
import { SnackbarState } from "@/app/types/SnackBarState";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");

    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        severity: "info",
        message: "",
        icon: <MdErrorOutline fontSize="inherit" />,
    });

    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setSnackbar({
                open: true,
                severity: "warning",
                message: "Debes ingresar un correo",
                icon: <MdErrorOutline fontSize="inherit" />,
            });
            return;
        }

        try {
            const response = await forgotPassword(email).unwrap();

            setSnackbar({
                open: true,
                severity: "success",
                message: response,
                icon: <FaRegCheckCircle fontSize="inherit" />,
            });

            setTimeout(() => {
                router.push(`/verify-code?email=${email}`);
            }, 1200);

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
        <div
            className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4"
            style={{
                backgroundImage: "url('/images/background-login.svg')",
                backgroundSize: "cover",
            }}
        >
            <div className="w-full max-w-sm bg-gray-200 shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                    Recuperar contraseña
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Correo electrónico"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@correo.com"
                        required
                    />

                    <Button
                        label={isLoading ? "Enviando..." : "Enviar código"}
                        type="submit"
                        disabled={isLoading}
                        className="w-full"
                    />
                </form>

                <p className="text-sm text-center text-gray-700 mt-4">
                    <a href="/login" className="text-purple-900 hover:underline">
                        Volver al login
                    </a>
                </p>
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