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
  }),
});

export const { useCreateWorkshopMutation } = workshopApi
