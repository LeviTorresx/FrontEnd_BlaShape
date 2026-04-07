import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { Plan, Subscription, CheckoutRequest } from "@/app/types/Subscription";

// Planes disponibles — GET /api_BS/monetization/plans
export const monetizationApi = createApi({
    reducerPath: "monetizationApi",
    baseQuery: axiosBaseQuery({
        baseUrl: "http://localhost:8080/api_BS/monetization",
    }),
    tagTypes: ["Subscription"],
    endpoints: (builder) => ({
        getPlans: builder.query<Plan[], void>({
            query: () => ({ url: "/plans", method: "GET" }),
        }),

        getCurrentSubscription: builder.query<Subscription, number>({
            query: (carpenterId) => ({
                url: `/active-subscription/${carpenterId}`,
                method: "GET",
            }),
            providesTags: ["Subscription"],
        }),
    }),
});

// Stripe Checkout — POST /api_BS/stripe/create-checkout-session
export const stripeApi = createApi({
    reducerPath: "stripeApi",
    baseQuery: axiosBaseQuery({
        baseUrl: "http://localhost:8080/api_BS/stripe",
    }),
    endpoints: (builder) => ({
        createCheckoutSession: builder.mutation<string, CheckoutRequest>({
            query: (body) => ({
                url: "/create-checkout-session",
                method: "POST",
                data: body,
            }),
        }),
    }),
});

export const { useGetPlansQuery, useGetCurrentSubscriptionQuery } = monetizationApi;
export const { useCreateCheckoutSessionMutation } = stripeApi;