import Button from "@/app/components/ui/Button";
import { FaKey } from "react-icons/fa";
import { ReactNode, useState } from "react";
import ChangePasswordForm from "@/app/components/forms/ChangePasswordForm";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import { MdErrorOutline, MdCheckCircle } from "react-icons/md";

export default function SecuritySection() {

    const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false);

    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        severity: "error" | "warning" | "info" | "success";
        message: string;
        icon: ReactNode;
    }>({
        open: false,
        severity: "info",
        message: "",
        icon: <MdErrorOutline fontSize="inherit" />,
    });

    const handleCloseSnackbar = () =>
        setSnackbar((prev) => ({ ...prev, open: false }));

    const showSnackbar = (
        severity: "error" | "warning" | "info" | "success",
        message: string,
        icon: ReactNode
    ) => setSnackbar({ open: true, severity, message, icon });

    return (
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 shadow-sm">

            <h2 className="font-semibold text-purple-800 mb-4">
                Seguridad
            </h2>

            <p className="text-gray-600 text-sm mb-6">
                Cambia tu contraseña o mejora la seguridad de tu cuenta.
            </p>

            <Button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                label="Cambiar contraseña"
                icon={<FaKey />}
                className="bg-purple-600 hover:bg-purple-700 text-white w-full"
            />

            {showPasswordForm && (
                <ChangePasswordForm
                    onSuccess={() => {
                        showSnackbar(
                            "success",
                            "Cambio de contraseña exitoso",
                            <MdCheckCircle fontSize="inherit" />
                        );
                        setShowPasswordForm(false);
                    }}
                />
            )}

            <NotificationSnackbar
                open={snackbar.open}
                severity={snackbar.severity}
                message={snackbar.message}
                icon={snackbar.icon}
                onClose={handleCloseSnackbar}
            />

        </div>
    );
}