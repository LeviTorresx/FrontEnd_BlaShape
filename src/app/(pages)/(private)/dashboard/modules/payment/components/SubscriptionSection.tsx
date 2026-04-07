"use client";

import { useState } from "react";
import { Subscription } from "@/app/types/Subscription";
import { SnackbarState } from "@/app/types/SnackBarState";
import {
    useCancelSubscriptionMutation,
    useReactivateSubscriptionMutation,
} from "@/app/services/paymentApi";
import { getErrorMessage } from "@/app/services/getErrorMessages";
import SubscriptionStatusBadge from "./SubscriptionStatusBadge";
import AppModal from "@/app/components/ui/AppModal";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import Button from "@/app/components/ui/Button";
import { FaCalendarAlt, FaExclamationTriangle } from "react-icons/fa";
import { formatDate } from "@/app/utils/formatDate";
import { PLAN_LABELS } from "../constant";

interface Props {
    subscription: Subscription | null;
    isLoading: boolean;
}

export default function SubscriptionSection({ subscription, isLoading }: Props) {
    const [cancelSubscription, { isLoading: isCanceling }] = useCancelSubscriptionMutation();
    const [reactivateSubscription, { isLoading: isReactivating }] = useReactivateSubscriptionMutation();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        severity: "success",
        message: "",
        icon: null,
    });

    const handleCancel = async () => {
        try {
            await cancelSubscription().unwrap();
            setConfirmOpen(false);
            setSnackbar({ open: true, severity: "success", message: "Suscripción cancelada. Tendrás acceso hasta el final del período.", icon: null });
        } catch (err) {
            setSnackbar({ open: true, severity: "error", message: getErrorMessage(err), icon: null });
        }
    };

    const handleReactivate = async () => {
        try {
            await reactivateSubscription().unwrap();
            setSnackbar({ open: true, severity: "success", message: "¡Suscripción reactivada exitosamente!", icon: null });
        } catch (err) {
            setSnackbar({ open: true, severity: "error", message: getErrorMessage(err), icon: null });
        }
    };

    if (isLoading) {
        return <div className="h-48 bg-gray-100 rounded-2xl animate-pulse" />;
    }

    if (!subscription) {
        return (
            <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl text-gray-500">
                No tienes ninguna suscripción activa.
            </div>
        );
    }

    const { planId, status, currentPeriodStart, currentPeriodEnd, cancelAtPeriodEnd, cutsUsed, cutsLimit } = subscription;

    return (
        <>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5 max-w-lg">

                {/* Plan y estado */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Plan actual</p>
                        <p className="text-xl font-bold text-gray-800">{PLAN_LABELS[planId] ?? planId}</p>
                    </div>
                    <SubscriptionStatusBadge status={status} />
                </div>

                {/* Período */}
                <div className="flex items-start gap-3 text-sm text-gray-600">
                    <FaCalendarAlt className="text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                        <p>Desde <span className="font-medium text-gray-800">{formatDate(currentPeriodStart)}</span></p>
                        <p>
                            {cancelAtPeriodEnd ? "Acceso hasta" : "Próximo cobro el"}{" "}
                            <span className="font-medium text-gray-800">{formatDate(currentPeriodEnd)}</span>
                        </p>
                    </div>
                </div>

                {/* Barra de cortes — solo BASIC */}
                {planId === "BASIC" && cutsLimit != null && cutsUsed != null && (
                    <div>
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                            <span>Cortes usados este mes</span>
                            <span className="font-medium text-gray-700">{cutsUsed} / {cutsLimit}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-purple-500 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min((cutsUsed / cutsLimit) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Aviso de cancelación pendiente */}
                {cancelAtPeriodEnd && (
                    <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                        <FaExclamationTriangle className="flex-shrink-0" />
                        <span>Tu suscripción no se renovará al final del período.</span>
                    </div>
                )}

                {/* Acciones */}
                <div className="pt-1">
                    {cancelAtPeriodEnd ? (
                        <Button
                            label={isReactivating ? "Reactivando..." : "Reactivar suscripción"}
                            disabled={isReactivating}
                            onClick={handleReactivate}
                        />
                    ) : (
                        <button
                            onClick={() => setConfirmOpen(true)}
                            className="text-sm text-red-500 hover:text-red-700 underline underline-offset-2 transition-colors"
                        >
                            Cancelar suscripción
                        </button>
                    )}
                </div>
            </div>

            {/* Modal confirmación cancelación */}
            <AppModal
                open={confirmOpen}
                title="Cancelar suscripción"
                onClose={() => setConfirmOpen(false)}
            >
                <p className="text-gray-600 mb-4">
                    Tu acceso se mantendrá hasta el <strong>{formatDate(currentPeriodEnd)}</strong>.
                    Después de esa fecha no se realizará ningún cobro.
                </p>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={() => setConfirmOpen(false)}
                        className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                    >
                        Volver
                    </button>
                    <Button
                        label={isCanceling ? "Cancelando..." : "Confirmar cancelación"}
                        disabled={isCanceling}
                        onClick={handleCancel}
                        className="bg-red-600 hover:bg-red-700"
                    />
                </div>
            </AppModal>

            <NotificationSnackbar
                open={snackbar.open}
                severity={snackbar.severity}
                message={snackbar.message}
                icon={snackbar.icon}
                onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
            />
        </>
    );
}