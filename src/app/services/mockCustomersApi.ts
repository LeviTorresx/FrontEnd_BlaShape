import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { Customer } from "../types/Customer";
import { mock_CUSTOMERS } from "../mocks/mockCustomers";

export const mockCustomersApi = createApi({
  reducerPath: "mockCustomersApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Customer"],
  endpoints: (builder) => ({
    getCustomers: builder.query<Customer[], void>({
      queryFn: async () => ({ data: mock_CUSTOMERS }),
      providesTags: ["Customer"],
    }),
  }),
});

export const { useGetCustomersQuery } = mockCustomersApi;
