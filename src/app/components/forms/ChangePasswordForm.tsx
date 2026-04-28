"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useChangePasswordMutation } from "@/app/services/authApi";
import { MdErrorOutline } from "react-icons/md";
import Button from "@/app/components/ui/Button";
import PasswordInput from "@/app/components/ui/PasswordInput";

interface ChangePasswordFormProps {
    onSuccess?: () => void;
}

export default function ChangePasswordForm({ onSuccess }: ChangePasswordFormProps) {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (newPassword !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            await changePassword({ currentPassword, newPassword }).unwrap();
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            onSuccess?.();
        } catch (err: any) {
            setError(err?.data?.message || "Error al cambiar contraseña");
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="pt-5 flex flex-col gap-4 max-w-sm mx-auto"
        >
            <PasswordInput
                label="Contraseña actual"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                required
            />
            <PasswordInput
                label="Nueva contraseña"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                required
            />
            <PasswordInput
                label="Confirmar nueva contraseña"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
            />

            {error && (
                <div className="flex items-center gap-2 text-red-500 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                    <MdErrorOutline className="shrink-0" />
                    {error}
                </div>
            )}

            <div className="flex justify-center">
                <Button
                    type="submit"
                    disabled={isLoading}
                    label={isLoading ? "Actualizando..." : "Actualizar contraseña"}
                    className="mt-1 py-2.5 rounded-lg text-sm"
                />
            </div>

        </motion.form>
    );
}