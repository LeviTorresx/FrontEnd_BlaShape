import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import {
    Pqrs,
    PqrsAnswerRequest,
    PqrsCreateResponse,
    PqrsRequest,
} from "../types/Pqrs";

interface PqrsMessageResponse {
    message: string;
    pqrs: Pqrs;
}

export const pqrsApi = createApi({
    reducerPath: "pqrsApi",
    baseQuery: axiosBaseQuery({
        baseUrl: "http://localhost:8080/api_BS/pqrs",
    }),
    tagTypes: ["Pqrs"],
    endpoints: (builder) => ({
        // === Creación pública (formulario híbrido) ===
        createPqrs: builder.mutation<PqrsCreateResponse, PqrsRequest>({
            query: (body) => ({
                url: "/create",
                method: "POST",
                data: body,
            }),
            invalidatesTags: ["Pqrs"],
        }),

        // === Listado del carpintero logueado ===
        getPqrsByCarpenter: builder.query<Pqrs[], void>({
            query: () => ({ url: "/all", method: "GET" }),
            providesTags: ["Pqrs"],
        }),

        // === Detalle por ID ===
        getPqrsById: builder.query<Pqrs, number>({
            query: (id) => ({ url: `/get/${id}`, method: "GET" }),
            providesTags: ["Pqrs"],
        }),

        // === Historial del cliente (panel privado del cliente) ===
        getPqrsByCustomer: builder.query<Pqrs[], number>({
            query: (customerId) => ({
                url: `/by-customer/${customerId}`,
                method: "GET",
            }),
            providesTags: ["Pqrs"],
        }),

        // === Magic link (público) ===
        trackByMagicLink: builder.query<Pqrs, string>({
            query: (token) => ({
                url: `/track?token=${encodeURIComponent(token)}`,
                method: "GET",
            }),
        }),

        // === Tracking manual: código + email (público) ===
        trackByCode: builder.query<Pqrs, { code: string; email: string }>({
            query: ({ code, email }) => ({
                url: `/track-by-code?code=${encodeURIComponent(
                    code
                )}&email=${encodeURIComponent(email)}`,
                method: "GET",
            }),
        }),

        // === Responder (carpintero) ===
        respondPqrs: builder.mutation<
            PqrsMessageResponse,
            { id: number; data: PqrsAnswerRequest }
        >({
            query: ({ id, data }) => ({
                url: `/respond/${id}`,
                method: "PUT",
                data,
            }),
            invalidatesTags: ["Pqrs"],
        }),

        // === Eliminar (soft delete, carpintero) ===
        deletePqrs: builder.mutation<{ message: string }, number>({
            query: (id) => ({ url: `/delete/${id}`, method: "DELETE" }),
            invalidatesTags: ["Pqrs"],
        }),
    }),
});

export const {
    useCreatePqrsMutation,
    useGetPqrsByCarpenterQuery,
    useGetPqrsByIdQuery,
    useGetPqrsByCustomerQuery,
    useLazyTrackByMagicLinkQuery,
    useLazyTrackByCodeQuery,
    useRespondPqrsMutation,
    useDeletePqrsMutation,
} = pqrsApi;