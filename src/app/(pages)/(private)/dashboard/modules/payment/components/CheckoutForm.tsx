"use client";

import { FormEvent, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { PlanId } from "@/app/types/Subscription";
import { useCreateSubscriptionMutation } from "@/app/services/paymentApi";
import { getErrorMessage } from "@/app/services/getErrorMessages";
import Button from "@/app/components/ui/Button";

interface Props {
    planId: PlanId;
    mode: "subscription" | "payment";
    onSuccess: () => void;
    onError: (message: string) => void;
}

export default function CheckoutForm({ planId, mode, onSuccess, onError }: Props) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [createSubscription] = useCreateSubscriptionMutation();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);
        try {
            if (mode === "subscription") {
                // Flujo BASIC / PRO: confirmar SetupIntent → crear suscripción
                const { error, setupIntent } = await stripe.confirmSetup({
                    elements,
                    redirect: "if_required",
                    confirmParams: {
                        return_url: `${window.location.origin}/dashboard/payment`,
                    },
                });

                if (error) {
                    onError(error.message ?? "Error al procesar el pago");
                    return;
                }

                const paymentMethodId =
                    typeof setupIntent.payment_method === "string"
                        ? setupIntent.payment_method
                        : setupIntent.payment_method?.id ?? "";

                await createSubscription({ planId, paymentMethodId }).unwrap();

            } else {
                // Flujo SINGLE_CUT: confirmar PaymentIntent directamente
                const { error } = await stripe.confirmPayment({
                    elements,
                    redirect: "if_required",
                    confirmParams: {
                        return_url: `${window.location.origin}/dashboard/payment`,
                    },
                });

                if (error) {
                    onError(error.message ?? "Error al procesar el pago");
                    return;
                }
            }

            onSuccess();
        } catch (err) {
            onError(getErrorMessage(err));
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            <Button
                type="submit"
                label={isProcessing ? "Procesando..." : "Confirmar pago"}
                disabled={!stripe || !elements || isProcessing}
                className="w-full"
            />
        </form>
    );
}