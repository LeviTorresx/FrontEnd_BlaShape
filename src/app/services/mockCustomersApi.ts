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

    updateCustomer: builder.mutation<Customer, Customer>({
      queryFn: async (updatedCustomer) => {
        try {
          const exists = mock_CUSTOMERS.some(
            (c) => c.customerId === updatedCustomer.customerId
          );

          if (!exists) {
            return { error: { status: 404, data: "Cliente no encontrado" } };
          }

          mock_CUSTOMERS = mock_CUSTOMERS.map((c) =>
            c.customerId === updatedCustomer.customerId
              ? { ...c, ...updatedCustomer }
              : c
          );

          const updated = mock_CUSTOMERS.find(
            (c) => c.customerId === updatedCustomer.customerId
          )!;
          return { data: updated };
        } catch (error) {
          return {
            error: {
              status: 500,
              data:
                "Error al actualizar el cliente: " + (error as Error).message,
            },
          };
        }
      },
      invalidatesTags: ["Customer"],
    }),

    deleteCustomer: builder.mutation<{ success: boolean; id: number }, number>({
      queryFn: async (customerId) => {
        try {
          const exists = mock_CUSTOMERS.some(
            (c) => c.customerId === customerId
          );

          if (!exists) {
            return { error: { status: 404, data: "Cliente no encontrado" } };
          }

          mock_CUSTOMERS = mock_CUSTOMERS.filter(
            (c) => c.customerId !== customerId
          );

          return { data: { success: true, id: customerId } };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: "Error al eliminar el cliente: " + (error as Error).message,
            },
          };
        }
      },
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = mockCustomersApi;
