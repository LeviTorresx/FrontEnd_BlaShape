"use client";

import { useState } from "react";
import { useGetPlansQuery, useCreateCheckoutSessionMutation } from "@/app/services/paymentApi";
import { Plan, Subscription } from "@/app/types/Subscription";
import { useAppSelector } from "@/app/hooks/useRedux";
import PlanCard from "./PlanCard";

interface Props {
    currentSubscription: Subscription | null;
}

export default function PlansSection({ currentSubscription }: Props) {
    const { data: plans = [], isLoading } = useGetPlansQuery();
    const [createCheckoutSession] = useCreateCheckoutSessionMutation();
    const user = useAppSelector((state) => state.auth.user);
    const [loadingPlanId, setLoadingPlanId] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSelectPlan = async (plan: Plan) => {
        if (!user?.carpenterId) return;

        setLoadingPlanId(plan.planId);
        try {
            const url = await createCheckoutSession({
                id: plan.planId,
                carpenterId: user.carpenterId,
                paymentType: plan.planName === "SINGLE_CUT" ? "ONE_TIME_PRODUCT" : "SUBSCRIPTION",
                description: plan.planName,
                successUrl: `${window.location.origin}/dashboard/payment?success=true`,
                cancelUrl: `${window.location.origin}/dashboard/payment`,
            }).unwrap();

            window.location.href = url;
        } catch (err: unknown) {
            setLoadingPlanId(null);
            const status = (err as { status?: number })?.status;
            if (status === 409) {
                setErrorMessage("Ya tienes una suscripción activa. Gestiona tu plan desde la pestaña Suscripción.");
            } else {
                setErrorMessage("Error al procesar el pago. Intenta de nuevo.");
            }
        }
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <PlanCard
                        key={plan.planId ?? plan.planName}
                        plan={plan}
                        isCurrentPlan={currentSubscription != null && currentSubscription.plan.planId === plan.planId}
                        isLoading={loadingPlanId === plan.planId}
                        onSelect={() => handleSelectPlan(plan)}
                    />
                ))}
            </div>
            {errorMessage && (
                <p className="text-sm text-red-600 text-center">{errorMessage}</p>
            )}
        </div>
    );
}