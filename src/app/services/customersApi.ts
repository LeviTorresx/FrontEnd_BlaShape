import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { Customer } from "../types/Customer";

interface CustomerResponse {
  message: string;
}

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:8080/api_BS/customer",
  }),
  tagTypes: ["Customer"],
  endpoints: (builder) => ({
    createCustomer: builder.mutation<CustomerResponse, Customer>({
      query: (body) => ({
        url: "/create",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Customer"],
    }),

    editCustomer: builder.mutation<CustomerResponse, Customer>({
      query: (body) => ({
        url: `/edit/${body.customerId}`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: ["Customer"],
    }),

    getCustomers: builder.query<Customer[], void>({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
      providesTags: ["Customer"],
    }),

    getCustomerById: builder.query<Customer, number>({
      query: (id) => ({
        url: `get/${id}`,
        method: "GET",
      }),
      providesTags: ["Customer"],
    }),

    deleteCustomer: builder.mutation<CustomerResponse, number>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useEditCustomerMutation,
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useDeleteCustomerMutation,
} = customerApi;
