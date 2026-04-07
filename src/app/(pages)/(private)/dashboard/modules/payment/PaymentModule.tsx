"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PaymentTabs, { PaymentTab } from "./components/PaymentTabs";
import PlansSection from "./components/PlansSection";
import SubscriptionSection from "./components/SubscriptionSection";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import { SnackbarState } from "@/app/types/SnackBarState";
import { FaCheckCircle } from "react-icons/fa";
import { useGetCurrentSubscriptionQuery } from "@/app/services/paymentApi";
import { useAppSelector } from "@/app/hooks/useRedux";

export default function PaymentModule() {
    const [tab, setTab] = useState<PaymentTab>("plans");
    const router = useRouter();
    const searchParams = useSearchParams();
    const user = useAppSelector((state) => state.auth.user);

    const { data: subscription = null, isLoading: isLoadingSubscription } =
        useGetCurrentSubscriptionQuery(user?.carpenterId ?? 0, {
            skip: !user?.carpenterId,
        });

    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        severity: "success",
        message: "",
        icon: null,
    });

    useEffect(() => {
        if (searchParams.get("success") === "true") {
            setSnackbar({
                open: true,
                severity: "success",
                message: "¡Pago exitoso! Tu suscripción está activa.",
                icon: <FaCheckCircle />,
            });
            router.replace("/dashboard/payment");
        }
    }, [searchParams, router]);

    return (
        <>
            <div className="space-y-6 p-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Suscripción y Pagos</h1>
                    <p className="text-sm text-gray-500">
                        Gestiona tu plan, métodos de pago y suscripción.
                    </p>
                </div>

                <PaymentTabs tab={tab} setTab={setTab} />

                {tab === "plans" && <PlansSection currentSubscription={subscription} />}
                {tab === "subscription" && (
                    <SubscriptionSection subscription={subscription} isLoading={isLoadingSubscription} />
                )}
            </div>

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