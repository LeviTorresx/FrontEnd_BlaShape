import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { Workshop, WorkshopPublic } from "../types/Workshop";

interface WorkshopResponse {
  message: string;
  workshop: Workshop;
}

export const workshopApi = createApi({
  reducerPath: "workshopApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/workshop`,
  }),
  endpoints: (builder) => ({
    createWorkshop: builder.mutation<WorkshopResponse, Workshop>({
      query: (body) => ({
        url: "/create",
        method: "POST",
        data: body,
      }),
    }),

    editWorkshop: builder.mutation<WorkshopResponse, Workshop>({
      query: (body) => ({
        url: `/edit/${body.workshopId}`,
        method: "PUT",
        data: body,
      }),
    }),

    getWorkshopById: builder.query<Workshop, number>({
      query: (id) => ({
        url: `get/${id}`,
        method: "GET",
      }),
    }),

    searchPublicWorkshops: builder.query<WorkshopPublic[], string>({
      query: (q) => ({
        url: `/public/search?q=${encodeURIComponent(q)}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateWorkshopMutation,
  useEditWorkshopMutation,
  useGetWorkshopByIdQuery,
  useLazySearchPublicWorkshopsQuery,
} = workshopApi;
