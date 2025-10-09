import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { Workshop } from "../types/Workshop";
import { mock_WORKSHOP } from "../mocks/mockWorkshop";

export const mockWorkshopApi = createApi({
  reducerPath: "mockWorkshopApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Workshop"],
  endpoints: (builder) => ({
    getWorkshop: builder.query<Workshop, void>({
      queryFn: async () => ({ data: mock_WORKSHOP }),
      providesTags: ["Workshop"],
    }),
  }),
});

export const { useGetWorkshopQuery } = mockWorkshopApi;
