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
            query: (body) => ({ url: "/create", method: "POST", data: body }),
            invalidatesTags: [{ type: "Pqrs", id: "LIST" }],
        }),

        // === Listado del carpintero logueado ===
        getPqrsByCarpenter: builder.query<Pqrs[], void>({
            query: () => ({ url: "/all", method: "GET" }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((p) => ({ type: "Pqrs" as const, id: p.pqrsId })),
                        { type: "Pqrs" as const, id: "LIST" },
                    ]
                    : [{ type: "Pqrs" as const, id: "LIST" }],
        }),

        // === Detalle por ID ===
        getPqrsById: builder.query<Pqrs, number>({
            query: (id) => ({ url: `/get/${id}`, method: "GET" }),
            providesTags: (_r, _e, id) => [{ type: "Pqrs", id }],
            async onQueryStarted(_id, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    // Sólo invalida la LISTA — nunca el propio detalle.
                    dispatch(pqrsApi.util.invalidateTags([{ type: "Pqrs", id: "LIST" }]));
                } catch { /* noop */ }
            },
        }),

        // === Historial del cliente (panel privado del cliente) ===
        getPqrsByCustomer: builder.query<Pqrs[], number>({
            query: (customerId) => ({
                url: `/by-customer/${customerId}`,
                method: "GET",
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((p) => ({ type: "Pqrs" as const, id: p.pqrsId })),
                        { type: "Pqrs" as const, id: "LIST" },
                    ]
                    : [{ type: "Pqrs" as const, id: "LIST" }],
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
            invalidatesTags: (_r, _e, { id }) => [
                { type: "Pqrs", id },
                { type: "Pqrs", id: "LIST" },
            ],
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
} = pqrsApi;