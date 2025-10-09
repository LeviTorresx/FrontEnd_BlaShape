import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { Alert } from "../types/Alert";
import { mock_ALERTS } from "../mocks/mocskAlerts";

export const mockAlertsApi = createApi({
  reducerPath: "mockAlertsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Alert"],
  endpoints: (builder) => ({
    getAlerts: builder.query<Alert[], void>({
      queryFn: async () => ({ data: mock_ALERTS }),
      providesTags: ["Alert"],
    }),
  }),
});

export const { useGetAlertsQuery } = mockAlertsApi;
