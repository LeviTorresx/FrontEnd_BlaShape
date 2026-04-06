"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import { MdErrorOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { useVerifyResetCodeMutation } from "@/app/services/authApi";
import { getErrorMessage } from "@/app/services/getErrorMessages";
import { SnackbarState } from "@/app/types/SnackBarState";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function VerifyCodePage() {
    const router = useRouter();

    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const [code, setCode] = useState("");

    const [verifyResetCode, { isLoading }] = useVerifyResetCodeMutation();

    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        severity: "info",
        message: "",
        icon: <MdErrorOutline fontSize="inherit" />,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!code) {
            setSnackbar({
                open: true,
                severity: "warning",
                message: "Debes ingresar el código",
                icon: <MdErrorOutline fontSize="inherit" />,
            });
            return;
        }

        try {
            const response = await verifyResetCode({
                email,
                code,
            }).unwrap();

            setSnackbar({
                open: true,
                severity: "success",
                message: response,
                icon: <FaRegCheckCircle fontSize="inherit" />,
            });

            setTimeout(() => {
                router.push(`/reset-password?email=${email}`);
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
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4"
            style={{
                backgroundImage: "url('/images/background-login.svg')",
                backgroundSize: "cover",
            }}
        >
            <div className="w-full max-w-sm bg-gray-200 shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Verificar código
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <Input
                        label="Código de verificación"
                        name="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="123456"
                        required
                    />

                    <Button
                        label={isLoading ? "Verificando..." : "Verificar"}
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