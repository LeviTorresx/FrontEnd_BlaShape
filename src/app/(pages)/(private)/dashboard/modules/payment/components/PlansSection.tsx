"use client";

import { useState } from "react";
import { useGetPlansQuery, useCreateSetupIntentMutation, useCreateSingleCutPaymentMutation } from "@/app/services/paymentApi";
import { Plan, Subscription } from "@/app/types/Subscription";
import PlanCard from "./PlanCard";
import CheckoutModal from "./CheckoutModal";

const MOCK_PLANS: Plan[] = [
  {
    planId: "SINGLE_CUT",
    name: "Pago Individual",
    price: 200,
    currency: "usd",
    interval: "one_time",
    stripePriceId: "",
    features: {
      pdf: true,
      svg: "limited",
      cuts: 1,
      history: "single",
      commercialLicense: false,
      analytics: false,
    },
  },
  {
    planId: "BASIC",
    name: "Basic",
    price: 1000,
    currency: "usd",
    interval: "month",
    stripePriceId: "",
    features: {
      pdf: true,
      svg: "full",
      cuts: 20,
      history: "limited",
      commercialLicense: false,
      analytics: false,
    },
  },
  {
    planId: "PRO",
    name: "Pro",
    price: 2500,
    currency: "usd",
    interval: "month",
    stripePriceId: "",
    features: {
      pdf: true,
      svg: "full",
      cuts: "unlimited",
      history: "full",
      commercialLicense: true,
      analytics: true,
    },
  },
];

interface Props {
    currentSubscription: Subscription | null;
}

export default function PlansSection({ currentSubscription }: Props) {
    const { data: plans = MOCK_PLANS, isLoading } = useGetPlansQuery();
    const [createSetupIntent] = useCreateSetupIntentMutation();
    const [createSingleCutPayment] = useCreateSingleCutPaymentMutation();

    const [checkoutData, setCheckoutData] = useState<{
        clientSecret: string;
        planId: Plan["planId"];
        mode: "subscription" | "payment";
    } | null>(null);

    const handleSelectPlan = async (plan: Plan) => {
        if (plan.planId === "SINGLE_CUT") {
            // TODO: pasar el cutId activo del módulo Shape
            const res = await createSingleCutPayment({ cutId: "", paymentMethodId: "" }).unwrap();
            setCheckoutData({ clientSecret: res.clientSecret ?? "", planId: plan.planId, mode: "payment" });
        } else {
            const res = await createSetupIntent().unwrap();
            setCheckoutData({ clientSecret: res.clientSecret, planId: plan.planId, mode: "subscription" });
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
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <PlanCard
                        key={plan.planId}
                        plan={plan}
                        isCurrentPlan={currentSubscription?.planId === plan.planId}
                        onSelect={() => handleSelectPlan(plan)}
                    />
                ))}
            </div>

            {checkoutData && (
                <CheckoutModal
                    clientSecret={checkoutData.clientSecret}
                    planId={checkoutData.planId}
                    mode={checkoutData.mode}
                    onClose={() => setCheckoutData(null)}
                    onSuccess={() => setCheckoutData(null)}
                />
            )}
        </>
    );
}