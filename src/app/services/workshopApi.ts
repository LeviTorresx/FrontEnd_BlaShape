import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { Workshop, workshopDTO } from "../types/Workshop";

interface WorkshopResponse {
  message: string;
}

export const workshopApi = createApi({
  reducerPath: "workshopApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:8080/api_BS/workshop",
  }),
  endpoints: (builder) => ({
    createWorkshop: builder.mutation<WorkshopResponse, workshopDTO>({
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
  }),
});

export const {
  useCreateWorkshopMutation,
  useEditWorkshopMutation,
  useGetWorkshopByIdQuery,
} = workshopApi;
