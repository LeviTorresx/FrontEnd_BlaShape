"use client";

import { useState } from "react";
import PaymentTabs, { PaymentTab } from "./components/PaymentTabs";
import PlansSection from "./components/PlansSection";
import SubscriptionSection from "./components/SubscriptionSection";
import { useGetCurrentSubscriptionQuery } from "@/app/services/paymentApi";

export default function PaymentModule() {
    const [tab, setTab] = useState<PaymentTab>("plans");
    const { data: subscription, isLoading } = useGetCurrentSubscriptionQuery();

    return (
        <div className="space-y-6 p-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Suscripción y Pagos</h1>
                <p className="text-sm text-gray-500">
                    Gestiona tu plan, métodos de pago y suscripción.
                </p>
            </div>

            <PaymentTabs tab={tab} setTab={setTab} />

            {tab === "plans" && (
                <PlansSection currentSubscription={subscription ?? null} />
            )}
            {tab === "subscription" && (
                <SubscriptionSection subscription={subscription ?? null} isLoading={isLoading} />
            )}
        </div>
    );
}