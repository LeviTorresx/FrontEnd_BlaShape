import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import {
    Plan,
    Subscription,
    CreateSubscriptionRequest,
    CreateSubscriptionResponse,
    CreateSingleCutPaymentRequest,
    CreateSingleCutPaymentResponse,
} from "@/app/types/Subscription";

export const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: axiosBaseQuery({
        baseUrl: "http://localhost:8080/api_BS/payment",
    }),
    tagTypes: ["Subscription"],
    endpoints: (builder) => ({
        getPlans: builder.query<Plan[], void>({
            query: () => ({
                url: "/plans", method: "GET"
            }),
        }),
        getCurrentSubscription: builder.query<Subscription, void>({
            query: () => ({ url: "/subscription/current", method: "GET" }),
            providesTags: ["Subscription"],
        }),
        createSetupIntent: builder.mutation<{ clientSecret: string }, void>({
            query: () => ({ url: "/setup-intent", method: "POST" }),
        }),
        createSubscription: builder.mutation<
            CreateSubscriptionResponse,
            CreateSubscriptionRequest
        >({
            query: (body) => ({
                url: "/subscription/create",
                method: "POST",
                data: body,
            }),
            invalidatesTags: ["Subscription"],
        }),

        cancelSubscription: builder.mutation<Subscription, void>({
            query: () => ({ url: "/subscription/cancel", method: "POST" }),
            invalidatesTags: ["Subscription"],
        }),

        reactivateSubscription: builder.mutation<Subscription, void>({
            query: () => ({ url: "/subscription/reactivate", method: "POST" }),
            invalidatesTags: ["Subscription"],
        }),

        createSingleCutPayment: builder.mutation<
            CreateSingleCutPaymentResponse,
            CreateSingleCutPaymentRequest
        >({
            query: (body) => ({
                url: "/single-cut/intent",
                method: "POST",
                data: body,
            }),
        }),
    }),
});

export const {
  useGetPlansQuery,
  useGetCurrentSubscriptionQuery,
  useCreateSetupIntentMutation,
  useCreateSubscriptionMutation,
  useCancelSubscriptionMutation,
  useReactivateSubscriptionMutation,
  useCreateSingleCutPaymentMutation,
} = paymentApi;