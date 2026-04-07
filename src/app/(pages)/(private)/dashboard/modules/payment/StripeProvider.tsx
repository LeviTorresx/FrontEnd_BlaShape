"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ReactNode } from "react";

// Fuera del componente para evitar re-inicialización en cada render
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface Props {
    clientSecret: string;
    children: ReactNode;
}

export default function StripeProvider({ clientSecret, children }: Props) {
    return (
        <Elements
            stripe={stripePromise}
            options={{
                clientSecret,
                appearance: {
                    theme: "stripe",
                    variables: {
                        colorPrimary: "#581c87",
                        colorBackground: "#faf5ff",
                        colorText: "#1f2937",
                        borderRadius: "12px",
                    },
                },
            }}
        >
            {children}
        </Elements>
    );
}