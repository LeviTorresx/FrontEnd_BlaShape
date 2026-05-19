import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import {
  FurnitureTypeCount,
  MostUsedMaterial,
  TopCustomer,
  TopCarpenter,
  TopCarpenterAmount,
  SubscriptionPlan,
  FurnituresByDateParams,
  TopCustomersParams,
  MostUsedMaterialsParams,
  TopCarpentersParams,
  TotalBetweenDatesParams,
} from "../types/Analytics";
import { FurnitureResponse } from "../types/Furniture"; // tipo correcto: tiene type, URLs, cutting

export const analyticsApi = createApi({
  reducerPath: "analyticsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:8080/api_BS/analytics",
  }),
  endpoints: (builder) => ({
    // ── Carpintero ────────────────────────────────────────────────────────────

    getFurnituresByDate: builder.query<FurnitureResponse[], FurnituresByDateParams>({
      query: ({ carpenterId, startDate, endDate }) => ({
        url: "/furnitures-by-date",
        method: "GET",
        params: { carpenterId, startDate, endDate },
      }),
    }),

    getFurnituresByType: builder.query<FurnitureTypeCount[], number>({
      query: (carpenterId) => ({
        url: "/furnitures-by-type",
        method: "GET",
        params: { carpenterId },
      }),
    }),

    getTopCustomers: builder.query<TopCustomer[], TopCustomersParams>({
      query: ({ carpenterId, limit }) => ({
        url: "/top-customers",
        method: "GET",
        params: { carpenterId, limit },
      }),
    }),

    getMostUsedMaterials: builder.query<
      MostUsedMaterial[],
      MostUsedMaterialsParams
    >({
      query: ({ carpenterId }) => ({
        url: "/most-used-materials",
        method: "GET",
        params: { carpenterId },
      }),
    }),

    // ── Admin / globales ──────────────────────────────────────────────────────

    getTopCarpentersByCuttings: builder.query<
      TopCarpenter[],
      TopCarpentersParams
    >({
      query: ({ limit }) => ({
        url: "/top-carpenters-by-cuttings",
        method: "GET",
        params: { limit },
      }),
    }),

    getOneTimeProductsCount: builder.query<number, void>({
      query: () => ({
        url: "/one-time-products-paid-count",
        method: "GET",
      }),
    }),

    getSubscriptionsCount: builder.query<number, void>({
      query: () => ({
        url: "/subscriptions-paid-count",
        method: "GET",
      }),
    }),

    getTotalBetweenDates: builder.query<number, TotalBetweenDatesParams>({
      query: ({ startDate, endDate }) => ({
        url: "/total-selled-between-dates",
        method: "GET",
        params: { startDate, endDate },
      }),
    }),

    getTopCarpentersByPaidPayments: builder.query<
      TopCarpenter[],
      TopCarpentersParams
    >({
      query: ({ limit }) => ({
        url: "/top-carpenters-by-paid-payments",
        method: "GET",
        params: { limit },
      }),
    }),

    getTopCarpentersByAmount: builder.query<
      TopCarpenterAmount[],
      TopCarpentersParams
    >({
      query: ({ limit }) => ({
        url: "/top-carpenters-by-amount",
        method: "GET",
        params: { limit },
      }),
    }),

    getActiveSubscriptionsCount: builder.query<number, void>({
      query: () => ({
        url: "/get-active-subscriptions-count",
        method: "GET",
      }),
    }),

    getSubscriptionsByPlan: builder.query<SubscriptionPlan[], void>({
      query: () => ({
        url: "/subscriptions-by-plan",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetFurnituresByDateQuery,
  useGetFurnituresByTypeQuery,
  useGetTopCustomersQuery,
  useGetMostUsedMaterialsQuery,
  useGetTopCarpentersByCuttingsQuery,
  useGetOneTimeProductsCountQuery,
  useGetSubscriptionsCountQuery,
  useGetTotalBetweenDatesQuery,
  useGetTopCarpentersByPaidPaymentsQuery,
  useGetTopCarpentersByAmountQuery,
  useGetActiveSubscriptionsCountQuery,
  useGetSubscriptionsByPlanQuery,
} = analyticsApi;