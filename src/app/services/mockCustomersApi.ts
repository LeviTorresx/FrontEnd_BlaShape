import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { Customer } from "../types/Customer";
import { mock_CUSTOMERS as MOCK_SOURCE } from "../mocks/mockCustomers";

let mock_CUSTOMERS: Customer[] = [...MOCK_SOURCE];

const autoIds = (array: Customer[]) =>
  array.length > 0 ? Math.max(...array.map((c) => c.customerId)) + 1 : 1;

export const mockCustomersApi = createApi({
  reducerPath: "mockCustomersApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Customer"],
  endpoints: (builder) => ({
    getCustomers: builder.query<Customer[], void>({
      queryFn: async () => ({ data: mock_CUSTOMERS }),
      providesTags: ["Customer"],
    }),

    addCustomer: builder.mutation<Customer, Partial<Customer>>({
      queryFn: async (newCustomer) => {
        try {
          const nextId = autoIds(mock_CUSTOMERS);

          const customer: Customer = {
            ...newCustomer,
            customerId: nextId,
          } as Customer;

          mock_CUSTOMERS = [...mock_CUSTOMERS, customer];

          return { data: customer };
        } catch (error) {
          return {
            error: {
              status: 500,
              data:
                "Ocurrió un error al agregar el cliente: " +
                (error as Error).message,
            },
          };
        }
      },
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const { useGetCustomersQuery, useAddCustomerMutation } = mockCustomersApi;
