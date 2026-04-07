"use client";

import { useState } from "react";
import { PlanId } from "@/app/types/Subscription";
import { SnackbarState } from "@/app/types/SnackBarState";
import AppModal from "@/app/components/ui/AppModal";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import StripeProvider from "../StripeProvider";
import CheckoutForm from "./CheckoutForm";
import { FaCheckCircle } from "react-icons/fa";
import { PLAN_LABELS } from "../constant";

interface Props {
    clientSecret: string;
    planId: PlanId;
    mode: "subscription" | "payment";
    onClose: () => void;
    onSuccess: () => void;
}

export default function CheckoutModal({ clientSecret, planId, mode, onClose, onSuccess }: Props) {
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        severity: "success",
        message: "",
        icon: null,
    });

    const handleSuccess = () => {
        setSnackbar({
            open: true,
            severity: "success",
            message: mode === "subscription"
                ? `¡Suscripción al ${PLAN_LABELS[planId]} activada exitosamente!`
                : "¡Pago completado! Tu corte está disponible.",
            icon: <FaCheckCircle />,
        });
        setTimeout(onSuccess, 1500);
    };

    const handleError = (message: string) => {
        setSnackbar({ open: true, severity: "error", message, icon: null });
    };

    return (
        <>
            <AppModal
                open
                title={PLAN_LABELS[planId]}
                onClose={onClose}
                maxWidth="sm"
            >
                <StripeProvider clientSecret={clientSecret}>
                    <CheckoutForm
                        planId={planId}
                        mode={mode}
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                </StripeProvider>
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