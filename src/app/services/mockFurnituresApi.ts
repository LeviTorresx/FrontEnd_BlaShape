import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { Furniture } from "../types/Furniture";
import { mock_FURNITURES } from "../mocks/mockfurnitures";

export const mockFurnituresApi = createApi({
  reducerPath: "mockFurnituresApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Furnitures"],
  endpoints: (builder) => ({
    getFurniture: builder.query<Furniture[], void>({
      queryFn: async () => ({ data: mock_FURNITURES }),
      providesTags: ["Furnitures"],
    }),
  }),
});

export const { useGetFurnitureQuery } = mockFurnituresApi;
