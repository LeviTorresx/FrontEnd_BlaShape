
import { FaKey, FaShieldAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
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

            <h2 className="font-semibold text-purple-800 mb-6">
                Seguridad
            </h2>

            {/* Card de opción */}
            <div className="bg-white border border-purple-100 rounded-xl shadow-sm overflow-hidden">

                <button
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                    className="w-full flex items-center justify-between p-5 hover:bg-purple-50 transition-colors duration-200"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                            <FaKey className="text-purple-600 text-sm" />
                        </div>
                        <div className="text-left">
                            <p className="font-medium text-gray-800 text-sm">
                                Cambiar contraseña
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                                Actualiza tu contraseña periódicamente para mayor seguridad
                            </p>
                        </div>
                    </div>
                    {showPasswordForm
                        ? <FaChevronUp className="text-purple-400 text-xs shrink-0" />
                        : <FaChevronDown className="text-purple-400 text-xs shrink-0" />
                    }
                </button>

                {showPasswordForm && (
                    <div className="border-t border-purple-100 px-5 pb-5">
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
                    </div>
                )}

            </div>

            {/* Card de seguridad adicional (decorativo, extensible a futuro) */}
            <div className="mt-3 bg-white border border-purple-100 rounded-xl shadow-sm p-5 flex items-center gap-4 opacity-50 cursor-not-allowed">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <FaShieldAlt className="text-purple-600 text-sm" />
                </div>
                <div className="text-left">
                    <p className="font-medium text-gray-800 text-sm">
                        Autenticación en dos pasos
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                        Próximamente disponible
                    </p>
                </div>
            </div>

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